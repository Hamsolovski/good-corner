import { BaseEntity, BeforeInsert, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";
import { Tag } from "./Tag";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Ad extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: string;

    @Field()
    @Column()
    title!: string;

    @Field()
    @Column()
    description?: string;

    @Field()
    @Column()
    owner!: string;

    @Field()
    @Column()
    price!: number; 

    @Field()
    @Column()
    picture?: string;

    @Field()
    @Column()
    location!: string;

    @Field()
	@Column()
	createdAt!: Date;

    @BeforeInsert()
	updateDates() {
		this.createdAt = new Date();
	}

    @Field(() => Category)
    @ManyToOne(() => Category, category => category.ads)
    category!: Category;

    @Field(() => [Tag])
    @ManyToMany(() => Tag, tag => tag.ads)
    @JoinTable()
    tags!: Tag[];
}

