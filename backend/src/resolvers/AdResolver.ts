import { Arg, Field, ID, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Ad } from "../entities/Ad";
import { Category } from "../entities/Category";
import { Tag } from "../entities/Tag";

@InputType()
class AdInput {
  @Field()
  title!: string;

  @Field({nullable: true})
  description?: string;

  @Field()
  owner!: string;

  @Field()
  price!: number;

  @Field({nullable: true})
  picture?: string;

  @Field()
  location!: string;

  @Field(() => ID)
  category!: Category;

  @Field(() => [ID])
  tags!: string[];
}

@InputType()
class PatchAdInput {
  @Field({nullable: true})
  title?: string;

  @Field({nullable: true})
  description?: string;

  @Field({nullable: true})
  owner?: string;

  @Field({nullable: true})
  price?: number;

  @Field({nullable: true})
  picture?: string;

  @Field({nullable: true})
  location?: string;

  @Field({nullable: true})
  category?: string;

  @Field({nullable: true})
  tags?: string;
}

@Resolver(Ad)
export class AdResolver {
  // BROWSE ALL ADS
  @Query(() => [Ad])
  async browseAds() {
    const ads = await Ad.find({relations: ["category", "tags"]});
    return ads;
  }

  // READ AD BY ID
  @Query(() => Ad)
  async getAdById(@Arg("id") id: string) {
    const ad = await Ad.findOneOrFail({ 
      where:{id},
      relations:["category", "tags"]
    });
    return ad;
  }

  // CREATE AN AD
  @Mutation(() => Ad)
  async createAd(@Arg("data") data: AdInput) {
    let ad = new Ad();

    const tags = data.tags;
    let adTags = [];
    if (tags && tags.length > 0) {
      for (const tagName of tags) {
        let tag = await Tag.findOne({where: {name: tagName}});
        if (!tag) {
          let newTag = new Tag();
          newTag.name = tagName;
          await newTag.save();
          adTags.push(newTag)
        }
      }
    }

    ad = Object.assign(ad, {...data})
    ad.tags = adTags
    await ad.save();
    return ad;
  }

  // DELETE AD BY ID
  @Mutation(() => Boolean)
  async deleteAdById(@Arg("id") id: string) {
    return (await Ad.delete({id})).affected
  }

  // EDIT AN AD BY ID
  @Mutation(() => Ad)
  async replaceAdById(
    @Arg("id") id:string,
    @Arg("data") data: AdInput
  ) {
    let ad = await Ad.findOneOrFail({
      where: {id},
      relations: {
        category: true,
        tags: true
      }
    })
    ad = Object.assign(ad, {
      ...data,
    })
    await ad.save();
    return ad;
  }
}
