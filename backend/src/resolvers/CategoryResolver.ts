import { Arg, Field, ID, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Category } from "../entities/Category";
import { Ad } from "../entities/Ad";

@InputType()
class CategoryInput {
    @Field()
    id!: string;

    @Field()
    name!: string;

    @Field(() => [ID])
    ads!: Ad[];
}

@Resolver(Category)
export class CategoryResolver {
  // BROWSE ALL CATEGORIES
  @Query(() => [Category])
  async browseCategories() {
    const categories = await Category.find({relations: ["ads"]});
    return categories;
  }
}