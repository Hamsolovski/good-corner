import { Arg, Field, ID, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Tag } from "../entities/Tag";
import { Ad } from "../entities/Ad";

@InputType()
class TagInput {
    @Field()
    id!: string;

    @Field()
    name!: string;

    @Field(() => [ID])
    ads!: Ad[];
}

@Resolver(Tag)
export class TagResolver {
  // BROWSE ALL TAGS
  @Query(() => [Tag])
  async browseTags() {
    const tags = await Tag.find({relations: ["ads"]});
    return tags;
  }
}