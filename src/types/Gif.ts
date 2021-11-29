type Gif = {
  id: string;
  title: string;
  images: {
    original: {
      height: number;
      width: number;
      url: string;
      webp: string;
    };
  };
};

export default Gif;
