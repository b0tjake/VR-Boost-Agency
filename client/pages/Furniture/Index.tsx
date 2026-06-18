import { type FormEvent, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

const categories = [
  {
    id: 1,
    name: "Chairs",
    itemCount: 5,
    imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/997772d1a495a730e126264ad225f30dd2abe535?width=388",
  },
  {
    id: 2,
    name: "Sofa",
    itemCount: 45,
    imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/24430ec721d275eabf81646e5d8e775e8487df50?width=388",
  },
  {
    id: 3,
    name: "Lamps",
    itemCount: 125,
    imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/4bb5e56944355e8d84c5da11b84e4416d5770fe5?width=388",
  },
  {
    id: 4,
    name: "Sofa",
    itemCount: 45,
    imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/5f98809d1814c8a260dfc13921a6bb57587ee4fa?width=388",
  },
  {
    id: 5,
    name: "Vase",
    itemCount: 25,
    imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/6c0fd634eaadb5f874715371c4cfd02a370bc464?width=388",
  },
  {
    id: 6,
    name: "Chairs",
    itemCount: 5,
    imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/997772d1a495a730e126264ad225f30dd2abe535?width=388",
  },
  {
    id: 7,
    name: "Vase",
    itemCount: 25,
    imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/6c0fd634eaadb5f874715371c4cfd02a370bc464?width=388",
  },
  {
    id: 8,
    name: "Sofa",
    itemCount: 45,
    imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/5f98809d1814c8a260dfc13921a6bb57587ee4fa?width=388",
  },
  {
    id: 9,
    name: "Lamps",
    itemCount: 125,
    imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/4bb5e56944355e8d84c5da11b84e4416d5770fe5?width=388",
  },
  {
    id: 10,
    name: "Sofa",
    itemCount: 45,
    imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/24430ec721d275eabf81646e5d8e775e8487df50?width=388",
  },
];

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

function CategoryCard({
  name,
  itemCount,
  imageUrl,
}: {
  name: string;
  itemCount: number;
  imageUrl: string;
}) {
  return (
    <div
      className="relative rounded-[10px] overflow-hidden my-4 cursor-pointer hover:opacity-90 transition-opacity flex-shrink-0"
      style={{ background: "#E7EAF9", width: "208px", height: "162px" }}
    >
      <img
        src={imageUrl}
        alt={name}
        className="absolute top-[7px] left-[7px] rounded-[10px] object-cover"
        style={{ width: "194px", height: "93px" }}
      />
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-[7px] py-2" style={{ height: "52px" }}>
        <div className="flex flex-col gap-1">
          <span className="text-black font-lato font-medium text-[18px] leading-none">{name}</span>
          <div className="flex items-center">
            <ColorSwatchIcon />
            <span className="text-app-muted font-lato font-normal text-[14px] ml-1">{itemCount} items</span>
          </div>
        </div>
        <DotsVerticalIcon />
      </div>
    </div>
  );
}

function NewCategoryCard({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Create new category"
      className="relative rounded-[10px] overflow-hidden cursor-pointer hover:opacity-90 transition-opacity flex-shrink-0 flex items-center justify-center my-4"
      style={{ background: "rgba(255, 255, 255, 0)", width: "208px", height: "162px" }}
    >
      {/* Diagonal tab at top-left */}
      <div
        className="absolute top-0 left-0 bg-[#E7EAF9] flex items-center justify-center rounded-full "
        style={{
          width: "107px",
          height: "43px",
          clipPath: "polygon(0 0, 85% 0, 100% 100%, 0 100%)",
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-[#E7EAF9]" style={{ height: "140px" }} />
      <div className="relative z-10 w-16 h-16 rounded-full bg-[#4A4C56] flex items-center justify-center shadow-md">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M10 14V24H14V14H24V10H14V0H10V10H0V14H10Z" fill="#E3EAFA"/>
        </svg>
      </div>
    </button>
  );
}

export default function Index() {
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const row1 = filtered.slice(0, 5);
  const row2 = filtered.slice(5);

  const openCreateModal = () => setIsCreateOpen(true);
  const closeCreateModal = () => setIsCreateOpen(false);

  const handleCreateCategory = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    closeCreateModal();
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 h-full flex flex-col">
        {/* Top bar: search + new button */}
        <div className="flex items-center gap-4 mb-8 flex-wrap">
          {/* Search */}
          <div className="flex items-center gap-2 bg-white rounded-[10px] px-4 py-3 flex-1 min-w-[200px] max-w-[447px] shadow-sm">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M21.4073 19.7527L16.9969 15.3422C18.0587 13.9286 18.6319 12.208 18.63 10.44C18.63 5.92406 14.9559 2.25 10.44 2.25C5.92406 2.25 2.25 5.92406 2.25 10.44C2.25 14.9559 5.92406 18.63 10.44 18.63C12.208 18.6319 13.9286 18.0587 15.3422 16.9969L19.7527 21.4073C19.9759 21.6069 20.2671 21.7135 20.5664 21.7051C20.8658 21.6967 21.1506 21.574 21.3623 21.3623C21.574 21.1506 21.6967 20.8658 21.7051 20.5664C21.7135 20.2671 21.6069 19.9759 21.4073 19.7527ZM4.59 10.44C4.59 9.28298 4.9331 8.15194 5.5759 7.18991C6.21871 6.22789 7.13235 5.47808 8.2013 5.03531C9.27025 4.59253 10.4465 4.47668 11.5813 4.70241C12.7161 4.92813 13.7584 5.48529 14.5766 6.30343C15.3947 7.12156 15.9519 8.16393 16.1776 9.29872C16.4033 10.4335 16.2875 11.6098 15.8447 12.6787C15.4019 13.7476 14.6521 14.6613 13.6901 15.3041C12.7281 15.9469 11.597 16.29 10.44 16.29C8.88906 16.2881 7.40217 15.6712 6.30548 14.5745C5.2088 13.4778 4.59186 11.9909 4.59 10.44Z" fill="#969696"/>
            </svg>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[#969696] font-inter font-medium text-base placeholder:text-[#969696]"
            />
          </div>

          {/* New button */}
          <button
            type="button"
            onClick={openCreateModal}
            className="flex items-center gap-2 bg-black text-white rounded-[10px] px-6 py-3 font-inter font-medium text-base hover:bg-gray-900 transition-colors whitespace-nowrap"
          >
            <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
              <path d="M4.566 0V4.566V9.132M9.132 4.566H0" stroke="white" strokeWidth="1.2176" strokeLinecap="round"/>
            </svg>
            New
          </button>
        </div>

        {/* Categories grid */}
        <div className="flex flex-col gap-5 overflow-auto">
          {/* Row 1 */}
          <div className="flex flex-wrap gap-[18px] shadow-[0_0_22px_0_rgba(0,0,0,0.22)]">
            <NewCategoryCard onClick={openCreateModal} />
            {row1.map((cat) => (
              <CategoryCard key={cat.id} {...cat} />
            ))}
          </div>

          {/* Row 2 */}
          {row2.length > 0 && (
            <div className="flex flex-wrap gap-[18px] shadow-[0_0_22px_0_rgba(0,0,0,0.22)]">
              {row2.map((cat) => (
                <CategoryCard key={cat.id} {...cat} />
              ))}
            </div>
          )}
        </div>
      </div>

      {isCreateOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4"
          onClick={closeCreateModal}
        >
          <form
            onSubmit={handleCreateCategory}
            className="w-full max-w-[420px] overflow-hidden rounded-[12px] shadow-[0_18px_50px_rgba(0,0,0,0.28)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex h-14 items-center justify-between bg-black px-5 text-white">
              <h2 className="font-lato text-base font-semibold leading-none">
                Create new category
              </h2>
              <button
                type="button"
                onClick={closeCreateModal}
                className="flex h-8 w-8 items-center justify-center rounded-full text-xl leading-none text-white hover:bg-white/10"
                aria-label="Close create category form"
              >
                X
              </button>
            </div>

            <div className="bg-[#f5f5f4] px-5 py-5">
              <label className="mb-2 block font-lato text-sm font-semibold text-[#1D1F2C]">
                Name
              </label>
              <input
                type="text"
                value={categoryName}
                onChange={(event) => setCategoryName(event.target.value)}
                className="mb-4 h-11 w-full rounded-[8px] border border-[#E0E0E0] bg-white px-3 font-lato text-sm text-[#1D1F2C] outline-none focus:border-[#007FED] focus:ring-2 focus:ring-[#007FED]/20"
                placeholder="Category name"
              />

              <label className="mb-2 block font-lato text-sm font-semibold text-[#1D1F2C]">
                Description
              </label>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="h-24 w-full resize-none rounded-[8px] border border-[#E0E0E0] bg-white px-3 py-3 font-lato text-sm text-[#1D1F2C] outline-none focus:border-[#007FED] focus:ring-2 focus:ring-[#007FED]/20"
                placeholder="Description"
              />
            </div>

            <div className="bg-white px-5 py-4">
              <button
                type="submit"
                className="h-11 w-full rounded-[8px] bg-[#007FED] font-inter text-base font-semibold text-white transition-colors hover:bg-[#0069c7]"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </DashboardLayout>
  );
}
