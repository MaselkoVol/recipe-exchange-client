export type UserShortInfo = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
};

export type UserWithFollowsInfo = UserShortInfo & {
  followersCount: number;
  followingCount: number;
};

export type User = UserShortInfo & {
  followersCount: number;
  followingCount: number;
  recipesCount: number;
};

export type UserPrivateInfo = {
  isFollowing: boolean;
};

export type CurrentUser = User;

export type Tag = {
  id: string;
  name: string;
};

export type TagCategory = {
  id: string;
  name: string;
  tags: Tag[];
};

export type TagWithCategoryId = Tag & {
  tagCategoryId: string;
};

export type Image = {
  id: string;
  imageUrl: string;
};

export type RecipeShortInfo = {
  id: string;
  title: string;
  ingredients: string;
  mainImageUrl: string | null;
  tags: TagWithCategoryId[];
  views: number;
  createdAt: string;
  author: UserShortInfo;
  likesCount: number;
};

export type Recipe = RecipeShortInfo & {
  authorId: string;
  text: string;
  images: Image[];
  updatedAt: string;
};

export type MetaType = {
  count?: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type AllRecipes = {
  data: RecipeShortInfo[];
  meta: MetaType;
};

export type LikedRecipes = {
  data: RecipeShortInfo[];
  meta: MetaType;
};

export type FavoriteRecipes = {
  data: RecipeShortInfo[];
  meta: MetaType;
};

export type UserFollowing = {
  data: {
    id: string;
    following: UserWithFollowsInfo;
  }[];
  meta: MetaType;
};

export type UserFollowers = {
  data: {
    id: string;
    follower: UserWithFollowsInfo;
  }[];
  meta: MetaType;
};

export type Comment = {
  id: string;
  rating: number;
  text: string;
  createdAt: string;
  images: Image[];
  user: UserShortInfo;
};

export type LikeResponse = ({ message: string } | { error: string }) & { active: boolean };
