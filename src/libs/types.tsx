export type DataType = {
  id: string;
  likes: number;
  urls: {
    regular: string;
  };
  user: {
    username: string;
    profile_image: {
      small: string;
    };
  };
  alt_description: string;
};
