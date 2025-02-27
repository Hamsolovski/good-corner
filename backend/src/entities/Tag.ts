import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ad } from "./Ad";
import { Field, ObjectType } from "type-graphql";


@Entity()
@ObjectType()
export class Tag extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    name!: string;

    @Field(() => [Ad])
    @ManyToMany(() => Ad, ad => ad.tags)
    ads!: Ad[];
}