import { ArrowLeft, ChevronLeft, ChevronRight, Eye, Star } from "lucide-react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import useProduct from "../../hooks/useProduct";
import Loading from "../../components/Loading";
import cn from "../../utils/cn";

export default function SingleProductPage() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const imageCarouselRef = useRef<HTMLDivElement>(null);
  const timeout = useRef<number>(null);
  const images = ["/assets/images/demo-product.png", "/assets/images/demo-product-2.png"];
  const { id } = useParams<{ id: string }>();
  const product = useProduct(id!);

  useEffect(() => {
    const singleSlideWidth = imageCarouselRef.current?.clientWidth;
    imageCarouselRef.current?.scroll({ left: singleSlideWidth! * activeImageIndex });
  }, [activeImageIndex]);

  useEffect(() => {
    const updateActiveIndexOnScrollEnd = () => {
      if (timeout.current) clearTimeout(timeout.current!);

      timeout.current = setTimeout(() => {
        const singleSlideWidth = imageCarouselRef.current?.clientWidth;
        const scrollLeft = imageCarouselRef.current?.scrollLeft;

        setActiveImageIndex(Math.round(scrollLeft! / singleSlideWidth!));
      }, 100);
    };

    imageCarouselRef.current?.addEventListener("scroll", updateActiveIndexOnScrollEnd);
    return () => {
      imageCarouselRef.current?.removeEventListener("scroll", updateActiveIndexOnScrollEnd);
    };
  });

  return (
    <div className="mobile:grid grid-cols-[1fr_200px] gap-4 min-h-full">
      <div className="bg-white shadow-md px-4 py-8 space-y-8 overflow-hidden">
        {product ? (
          <>
            <header className="flex gap-4">
              <Link to={location.pathname.includes("dashboard") ? "/dashboard/marketplce" : "/marketplace"}>
                <ArrowLeft size={25} />
              </Link>
              <div className="flex items-center gap-4">
                <img src="/assets/images/demo-avatar.png" width={52} alt="Seller avatar" />
                <div>
                  <h1 className="text-2xl">Datalite Gadgets</h1>
                  <Link className="text-primary" to="/marketplace/seller/id">
                    View Profile
                  </Link>
                </div>
              </div>
            </header>

            {/* Image carousel */}
            <div>
              <div className="relative overflow-hidden space-y-3">
                {/* Nav buttons */}
                {product.images.length > 1 && (
                  <>
                    {activeImageIndex > 0 && (
                      <button
                        onClick={() => setActiveImageIndex(activeImageIndex - 1)}
                        className="cursor-pointer p-2 absolute top-1/2 left-4 -translate-y-1/2"
                      >
                        <ChevronLeft size={30} />
                      </button>
                    )}
                    {activeImageIndex < images.length - 1 && (
                      <button
                        onClick={() => setActiveImageIndex(activeImageIndex + 1)}
                        className="cursor-pointer p-2 absolute top-1/2 right-4 -translate-y-1/2"
                      >
                        <ChevronRight size={30} />
                      </button>
                    )}
                  </>
                )}
                {/* Nav buttons */}

                <div
                  ref={imageCarouselRef}
                  className="max-w-full overflow-auto snap-mandatory snap-x flex no-scrollbar"
                >
                  {product.images.map((image) => (
                    <div className="snap-center snap-always w-full min-w-full max-w-full" key={image}>
                      <img className="max-w-[90%] block mx-auto" src={image} alt="" />
                    </div>
                  ))}
                </div>
                <div className="flex overflow-auto justify-end gap-4">
                  {images.map((image, i) => (
                    <button className="cursor-pointer" onClick={() => setActiveImageIndex(i)} key={i}>
                      <img className="h-[52px] w-auto" src={image} alt="" />
                    </button>
                  ))}
                </div>
                <div
                  style={{ gridTemplateColumns: `repeat(${images.length + 1}, 14px)` }}
                  className="w-fit grid gap-2 mx-auto"
                >
                  {images.map((_, i) => (
                    <div
                      key={i}
                      className={`${activeImageIndex === i ? "bg-primary col-span-2" : "bg-[#B3B3B3]"} h-0.75`}
                    ></div>
                  ))}
                </div>
              </div>
              {/* Image carousel */}

              {/* Product desciption */}
              <div className="bg-gradient-to-b from-white to-[#DAE2FF] py-8 px-1 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                  <div className="space-y-1 col-span-9">
                    <h2 className="text-lg font-medium">{product.name}</h2>
                    <p className="text-sm text-[#000000BF]">{product.description}</p>
                    <Info heading="Brand" value="none" />
                    <Info heading="Size" value="none" />
                    <Info heading="Color" value="none" />
                  </div>

                  <div className="col-span-2 flex flex-col justify-between space-y-3">
                    {/* Price */}
                    <div className="relative before:absolute before:w-full before:h-full before:bg-gradient-to-b before:from-[#4B70F5] before:to-[#2C418F00] before:rounded-lg before:-rotate-6 before:z-0 before:opacity-20 w-fit">
                      {product.discount && (
                        <p className="line-through text-[#77777A] text-xs relative">
                          ₦{Number(product.price.toLocaleString()).toFixed(2)}
                        </p>
                      )}
                      <p className="text-lg font-semibold relative">
                        ₦
                        {product.discount
                          ? (product.price - (product.price * product.discount) / 100).toFixed(2)
                          : product.price}
                      </p>
                    </div>
                    {/* Price */}

                    <div className="flex gap-3 justify-center p-2 rounded-md bg-gradient-to-b from-[#DAE2FF] to-[#DAE2FF00] w-fit">
                      <button>
                        <span style={{ fontSize: 18 }} className="material-icons-outlined">
                          favorite
                        </span>
                      </button>
                      <button>
                        <span style={{ fontSize: 18 }} className="material-icons-outlined">
                          share
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="h-1 border-t border-dashed border-[#66666666] w-[80%] mx-auto"></div>

                <div className="flex gap-x-4 gap-y-2 justify-between text-sm text-[#77777A] whitespace-nowrap flex-wrap">
                  <div className="flex gap-6 items-center">
                    <span className="inline-flex items-center gap-2">
                      <span style={{ fontSize: 14 }} className="material-icons-outlined">
                        location_on
                      </span>{" "}
                      Lagos, Ikeja, 27 mins ago.
                    </span>
                    <span>|</span>
                    <span className="inline-flex items-center gap-2">
                      <Eye size={14} /> {product.reviews_count} views
                    </span>
                  </div>
                  <div className="flex gap-6">
                    <span className="text-primary">({product.reviews_count} Reviews)</span>
                    <span>300 units</span>
                    <span className="flex items-center gap-1">
                      <b className="text-black">{product.rating}</b>
                      {Array(5)
                        .fill(true)
                        .map((_, i) => (
                          <span style={{ fontSize: 14 }} className="material-icons-outlined" key={i}>
                            star
                          </span>
                        ))}
                    </span>
                  </div>
                </div>

                <div className="flex gap-6 flex-wrap">
                  <button className="px-4 py-2 active:scale-90 transition-transform bg-primary rounded-xl text-sm text-white">
                    Contact Seller
                  </button>
                  <button className="px-4 py-2 active:scale-90 transition-transform border-primary border-1 rounded-xl text-sm text-primary">
                    Add to Cart
                  </button>
                </div>
              </div>
              {/* Product desciption */}
            </div>

            {/* Customer feedback */}
            <div className="space-y-4">
              <h2 className="font-semibold">Customer Feedback</h2>
              <div className="space-y-6">
                <Feedback
                  name="Onah Victor"
                  rating={3}
                  comment="Amazing sound quality and super comfortable to wear! The battery life is a game-changer."
                  date="Dec.29,2024"
                />
                <Feedback
                  name="Onah Victor"
                  rating={5}
                  comment="Amazing sound quality and super comfortable to wear! The battery life is a game-changer."
                  date="Dec.29,2024"
                />
              </div>
            </div>
            {/* Customer feedback */}

            <div className="space-y-3">
              <h2 className="text-primary text-[13.34px] font-medium">
                You want to resell this product and make profit?
              </h2>
              <p className="font-light">
                To start reselling this product, simply click the button below to generate your unique reseller link.
                This personalized link will track all your sales for this specific product. 💰 Commission Details:You
                will earn a reseller commission of ₦10,000 every time someone purchases this product using your unique
                link. Take Action Now!Click the button below and start earning today!
              </p>
              <div>
                <h3 className="text-lg">💰Commission Details:</h3>
                <p className="font-light">
                  You will earn a reseller commission of ₦10,000 every time someone purchases this product using your
                  unique link.
                </p>
              </div>
              <div className="flex justify-between flex-wrap gap-2">
                <div>
                  <h3 className="text-lg">Take Action Now!</h3>
                  <p className="font-light">Click the button to start earning today.</p>
                </div>
                <button className="px-4 py-2 active:scale-90 transition-transform bg-primary rounded-xl text-white text-sm">
                  Generate Reseller Link
                </button>
              </div>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>

      <div>
        <SellerInfoAside />
      </div>
    </div>
  );
}

// TODO: Modify the props as necessary.
function Feedback({ name, rating, comment, date }: { name: string; rating: number; comment: string; date: string }) {
  return (
    <div className="max-w-[294px] space-y-1">
      <div className="flex gap-2 items-center">
        <img width={28.089} src="/assets/images/demo-avatar.png" alt={name} />
        <p className="flex items-center gap-2">
          <span className="text-[14.04px]">{name}</span>
          <img width={14.04} src="/images/nigerian-flag.png" alt="Flag" /> |{" "}
          <span className="text-[#77777A] text-[10.53px]">{date}</span>
        </p>
      </div>
      <div className="flex gap-1">
        {Array(5)
          .fill(true)
          .map((_, i) => (
            <span
              style={{ fontSize: 14 }}
              className={cn("material-icons text-zinc-600", {
                "text-warning": rating > i
              })}
              key={i}
            >
              star
            </span>
          ))}
      </div>
      <p className="text-[10.53px] text-[#77777A]">{comment}</p>
    </div>
  );
}

function Info({ heading, value }: { heading: string; value: ReactNode }) {
  return (
    <p className="text-sm">
      <b>{heading}:</b> <span className="text-[#000000BF]">{value}</span>
    </p>
  );
}

function SellerInfoAside() {
  return (
    <div className="lg:mt-24 space-y-10 max-lg:p-4 text-sm">
      <div className="bg-white p-4 rounded-[15.2px] space-y-4">
        <div className="flex gap-2">
          <img width={42} height={42} src="/assets/images/demo-avatar.png" alt="Avatar" />
          <div className="text-[#000000BF]">
            <p className="font-medium">Alayande Bamidele</p>
            <p className="text-xs">@Datalite Gadgets</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <img src="/assets/images/twemoji_flag-nigeria.png" width={20} alt="Flag" /> |{" "}
          <span className="relative text-[#77777A] text-[9.82px]">
            Online <span className="absolute -left-1.5 top-1 h-1 w-1 bg-green-400 rounded-full"></span>
          </span>
        </div>
        <div className="flex justify-between gap-4 whitespace-nowrap text-xs">
          <div className="text-[#00B306] bg-[#00B3061A] text-[9.5px] px-2 py-1 rounded-full text-center">
            Verified ID
          </div>
          <div className="text-[7.34px] flex items-center gap-1">
            <Star size={12} color="#F5B300" /> 4.8
          </div>
          <button className="text-white bg-primary text-[9.5px] px-2 py-1 rounded-full text-center">Follow</button>
        </div>
        <div className="h-1 border-t border-dashed border-[#66666666] w-[80%] mx-auto"></div>
        <div className="flex gap-2">
          <div className="bg-[#EEF0FF] px-2 py-0.5 rounded-lg flex flex-col gap-0.5 border-1 border-[#66666666] flex-1">
            <span className="text-[9.43px]">3</span>
            <span className="text-[8px]">Referrals</span>
          </div>
          <div className="bg-[#EEF0FF] px-2 py-0.5 rounded-lg flex flex-col gap-0.5 border-1 border-[#66666666] flex-1">
            <span className="text-[9.43px]">6</span>
            <span className="text-[8px]">Followers</span>
          </div>
          <div className="bg-[#EEF0FF] px-2 py-0.5 rounded-lg flex flex-col gap-0.5 border-1 border-[#66666666] flex-1">
            <span className="text-[9.43px]">1</span>
            <span className="text-[8px]">Following</span>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap justify-center items-center">
          <button className="cursor-pointer active:scale-90 transition-transform text-[7.92px] px-[15.2px] py-[9.5px] w-fit bg-primary rounded-[20.01px] text-white">
            Contact Seller
          </button>
          <button className="cursor-pointer active:scale-90 transition-transform text-[7.92px] px-[15.2px] py-[9.5px] w-fit border-primary border-1 rounded-[20.01px] text-primary">
            Start Chat
          </button>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <span className="material-icons-outlined" style={{ fontSize: 12 }} color="#000000BF">
          location_on
        </span>{" "}
        <p className="text-xs font-light text-[#000000BF]">
          Municipal Area Council, Federal Capital Territory, Nigeria
        </p>
      </div>
      <div className="text-xs space-y-4">
        <h3 className="font-medium">Safety tips</h3>
        <ul className="text-[#000000BF] font-light space-y-1 list-disc list-inside text-xs">
          <li>Avoid paying in advance, even for delivery</li>
          <li>Meet with the seller at a safe public place</li>
          <li>Inspect the item and ensure it's exactly what you want</li>
          <li>Make sure that the packed item is the one you've inspected</li>
          <li>Only pay if you're satisfied</li>
        </ul>
      </div>
    </div>
  );
}
