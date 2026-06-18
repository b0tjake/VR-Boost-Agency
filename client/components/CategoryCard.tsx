interface CategoryCardProps {
  name: string;
  itemCount: number;
  imageUrl: string;
  isNew?: boolean;
}

const ColorSwatchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M4 2C2.89543 2 2 2.89543 2 4V15C2 16.6569 3.34315 18 5 18C6.65685 18 8 16.6569 8 15V4C8 2.89543 7.10457 2 6 2H4ZM5 16C5.55228 16 6 15.5523 6 15C6 14.4477 5.55228 14 5 14C4.44772 14 4 14.4477 4 15C4 15.5523 4.44772 16 5 16Z" fill="#83889D"/>
    <path d="M10 14.2426L14.8995 9.34308C15.6805 8.56203 15.6805 7.2957 14.8995 6.51465L13.4853 5.10044C12.7042 4.31939 11.4379 4.31939 10.6568 5.10044L10 5.75728V14.2426Z" fill="#83889D"/>
    <path d="M16 18H9.07104L15.071 12H16C17.1046 12 18 12.8954 18 14V16C18 17.1046 17.1046 18 16 18Z" fill="#83889D"/>
  </svg>
);

const DotsVerticalIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 19L12 18.99M12 12L12 11.99M12 5L12 4.99M12 18C12.5523 18 13 18.4477 13 19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19C11 18.4477 11.4477 18 12 18ZM12 11C12.5523 11 13 11.4477 13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11ZM12 4C12.5523 4 13 4.44772 13 5C13 5.55229 12.5523 6 12 6C11.4477 6 11 5.55229 11 5C11 4.44772 11.4477 4 12 4Z" stroke="#83889D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function CategoryCard({ name, itemCount, imageUrl, isNew }: CategoryCardProps) {
  if (isNew) {
    return (
      <div className="relative flex-shrink-0 rounded-[10px] pb-10 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
        style={{ width: "208px", height: "162px", background: "rgba(255,255,255,0.44)" }}>
        <div className="w-full h-[140px] bg-[#D9D9D9] absolute bottom-0" />
        <div
          className="absolute top-0 left-0 flex items-center justify-center"
          style={{
            background: "#D9D9D9",
            clipPath: "polygon(0 0, 90% 0, 100% 100%, 0 100%)",
            width: "107px",
            height: "43px",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-app-secondary flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M10 14V24H14V14H24V10H14V0H10V10H0V14H10Z" fill="#E3EAFA"/>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative flex-shrink-0 rounded-[10px] overflow-hidden cursor-pointer hover:opacity-90 transition-opacity group"
      style={{ width: "208px", height: "162px", background: "#D9D9D9" }}
    >
      {/* Category image */}
      <img
        src={imageUrl}
        alt={name}
        className="absolute top-2 left-2 rounded-[10px] object-cover"
        style={{ width: "194px", height: "93px" }}
      />

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-2 py-2" style={{ height: "58px" }}>
        <div className="flex flex-col gap-1">
          <span className="text-black font-lato font-medium text-lg leading-none">{name}</span>
          <div className="flex items-center gap-1">
            <ColorSwatchIcon />
            <span className="text-app-muted font-lato font-normal text-sm">{itemCount} items</span>
          </div>
        </div>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity">
          <DotsVerticalIcon />
        </button>
        <div className="absolute right-2 bottom-4 opacity-100">
          <DotsVerticalIcon />
        </div>
      </div>
    </div>
  );
}
