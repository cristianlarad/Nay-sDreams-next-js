interface Hero03Props {
  title: string;
  description: string;
  price: number;
}

const Hero03 = ({ description, price }: Hero03Props) => {
  return (
    <div className="flex-col items-center px-6 py-16 ">
      <div className="max-w-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-pink-500/20 text-pink-500 text-xs font-medium px-3 py-2 rounded-lg">
              Precio: ${price}
            </span>
          </div>
        </div>
        <p className="mt-6 text-[17px] md:text-lg">{description}</p>
      </div>
    </div>
  );
};

export default Hero03;
