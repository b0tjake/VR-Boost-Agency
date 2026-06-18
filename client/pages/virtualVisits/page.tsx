import { useState } from "react";
import {
  Search,
  Mail,
  Bell,
  ChevronDown,
  Plus,
  MapPin,
  MoreVertical,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

type Status = "scanning" | "pending" | "not-started" | "completed";

interface Visit {
  id: string;
  title: string;
  address: string;
  rooms: string;
  status: Status;
  assigneeCount: number;
  image: string;
}

const visits: Visit[] = [
  {
    id: "34115",
    title: "Youssef Alami, Apartment",
    address: "12 Rue de la Paix, Rabat 10000, Morocco",
    rooms: "Living Room, Bedroom, Kitchen",
    status: "scanning",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/b790c4629cffb0c8f5a4f55d52bb3b358d0031ea?width=274",
    assigneeCount: 1,
  },
  {
    id: "34115",
    title: "Ahmed El Idrissi, Apartment",
    address: "12 Rue de la Paix, Rabat 10000, Morocco",
    rooms: "Living Room, Bedroom, Kitchen",
    status: "pending",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/b0bfce56a3b0ab6a6bda3c8fe55e8c40ed3cf9ca?width=274",
    assigneeCount: 3,
  },
  {
    id: "34115",
    title: "Fatima Benjelloun, Villa",
    address: "12 Rue de la Paix, Rabat 10000, Morocco",
    rooms: "Living Room, Bedroom, Kitchen",
    status: "not-started",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/d126d6d1ccd49fd7ecb34ad96e760bcae9beeaf8?width=274",
    assigneeCount: 2,
  },
  {
    id: "34115",
    title: "Hicham Amrani, Apartment",
    address: "12 Rue de la Paix, Rabat 10000, Morocco",
    rooms: "Living Room, Bedroom, Kitchen",
    status: "completed",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/b0bfce56a3b0ab6a6bda3c8fe55e8c40ed3cf9ca?width=274",
    assigneeCount: 3,
  },
];

const statusConfig: Record<
  Status,
  { label: string; color: string; bg: string }
> = {
  scanning: {
    label: "Scanning",
    color: "#007FED",
    bg: "rgba(0, 148, 255, 0.11)",
  },
  pending: {
    label: "Pending",
    color: "#E66E00",
    bg: "rgba(255, 137, 0, 0.11)",
  },
  "not-started": {
    label: "Not Started",
    color: "#667079",
    bg: "rgba(93, 111, 127, 0.11)",
  },
  completed: {
    label: "Completed",
    color: "#49A700",
    bg: "rgba(36, 255, 0, 0.11)",
  },
};

const avatarColors = [
  "#B8CDE8",
  "#C5B8E8",
  "#B8E8D4",
  "#E8D4B8",
  "#E8B8C5",
  "#B8E8E8",
];

function VideoThumbnail({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-[120px] lg:w-[137px] h-[84px] lg:h-[96px] rounded-[15px] relative overflow-hidden flex-shrink-0">
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-white/25 backdrop-blur-[3px] shadow-lg flex items-center justify-center">
          <svg
            width="14"
            height="16"
            viewBox="0 0 14 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.25 7.134C13.9167 7.519 13.9167 8.481 13.25 8.866L1.25 15.794C0.583333 16.179 -2.38419e-07 15.698 -1.78814e-07 14.928L8.9407e-08 1.072C1.49012e-07 0.302 0.583334 -0.179 1.25 0.206L13.25 7.134Z"
              fill="white"
            />
            
          </svg>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const config = statusConfig[status];
  return (
    <div
      className="inline-flex items-center gap-1 px-3 py-1 rounded-[5px] whitespace-nowrap"
      style={{ backgroundColor: config.bg }}
    >
      <div
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: config.color }}
      />
      <span
        className="text-sm font-medium font-roboto leading-5"
        style={{ color: config.color }}
      >
        {config.label}
      </span>
    </div>
  );
}

function AssigneeAvatars({ count }: { count: number }) {
  return (
    <div className="flex items-center">
      {Array.from({ length: Math.min(count, 4) }).map((_, i) => (
        <div
          key={i}
          className="w-[30px] h-[30px] rounded-full border border-[#E6E5E5] flex-shrink-0"
          style={{
            backgroundColor: avatarColors[i % avatarColors.length],
            marginLeft: i > 0 ? "-8px" : "0",
            zIndex: count - i,
            position: "relative",
          }}
        />
      ))}
    </div>
  );
}

function VisitRow({
  visit,
  isAlternate,
}: {
  visit: Visit;
  isAlternate: boolean;
}) {
  return (
    <div
      className={`flex items-center px-4 lg:px-6 py-3 gap-3 lg:gap-4 border-b border-white/20 ${
        isAlternate ? "bg-white/15" : ""
      }`}
      style={{ minHeight: "136px" }}
    >
      {/* Checkbox */}
      <div className="w-5 h-5 rounded-[5px] border border-[#B8B8B8] bg-white shadow-sm flex-shrink-0" />

      {/* ID */}
      <div className="w-12 lg:w-14 flex-shrink-0">
        <span className="text-[#21272A] font-lato text-sm lg:text-base font-semibold leading-5">
          {visit.id}
        </span>
      </div>

      {/* Thumbnail */}
      <VideoThumbnail src={visit.image} alt={visit.title} />

      {/* Property info */}
      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        <h3 className="text-[#21272A] font-lato text-base lg:text-xl font-bold leading-5 truncate">
          {visit.title}
        </h3>
        <div className="flex items-center gap-1">
          <MapPin className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-[#4A4C56] flex-shrink-0" />
          <span className="text-[#4A4C56] font-lato text-sm lg:text-base font-normal leading-5 truncate">
            {visit.address}
          </span>
        </div>
        <p className="text-[#848484] font-lato text-xs lg:text-[13px] font-normal leading-5 truncate">
          {visit.rooms}
        </p>
      </div>

      {/* Status */}
      <div className="flex-shrink-0 w-[100px] lg:w-[120px] flex justify-center">
        <StatusBadge status={visit.status} />
      </div>

      {/* Assigned */}
      <div className="flex-shrink-0 w-[70px] lg:w-[90px] flex justify-center hidden sm:flex">
        <AssigneeAvatars count={visit.assigneeCount} />
      </div>

      {/* Three dot menu */}
      <button className="flex-shrink-0 flex flex-col items-center justify-center gap-[3px] p-2 w-9 h-9">
        <div className="w-[5px] h-[5px] rounded-full bg-[#53646D]" />
        <div className="w-[5px] h-[5px] rounded-full bg-[#53646D]" />
        <div className="w-[5px] h-[5px] rounded-full bg-[#53646D]" />
      </button>
    </div>
  );
}

function DashboardIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <path
        d="M1.3125 21C0.964404 21 0.630565 20.8617 0.384423 20.6156C0.138282 20.3694 0 20.0356 0 19.6875V13.125C0 12.7769 0.138281 12.4431 0.384423 12.1969C0.630564 11.9508 0.964404 11.8125 1.3125 11.8125H19.6875C20.0356 11.8125 20.3694 11.9508 20.6156 12.1969C20.8617 12.4431 21 12.7769 21 13.125V19.6875C21 20.0356 20.8617 20.3694 20.6156 20.6156C20.3694 20.8617 20.0356 21 19.6875 21H1.3125ZM1.3125 9.1875C0.964404 9.1875 0.630564 9.04922 0.384423 8.80308C0.138281 8.55694 0 8.2231 0 7.875V1.3125C0 0.964404 0.138281 0.630565 0.384422 0.384423C0.630564 0.138282 0.964403 0 1.3125 0H7.875C8.2231 0 8.55694 0.138281 8.80308 0.384423C9.04922 0.630564 9.1875 0.964404 9.1875 1.3125V7.875C9.1875 8.2231 9.04922 8.55694 8.80308 8.80308C8.55694 9.04922 8.2231 9.1875 7.875 9.1875H1.3125ZM13.125 9.1875C12.7769 9.1875 12.4431 9.04922 12.1969 8.80308C11.9508 8.55694 11.8125 8.2231 11.8125 7.875V1.3125C11.8125 0.964404 11.9508 0.630564 12.1969 0.384423C12.4431 0.138281 12.7769 0 13.125 0H19.6875C20.0356 0 20.3694 0.138281 20.6156 0.384422C20.8617 0.630564 21 0.964403 21 1.3125V7.875C21 8.2231 20.8617 8.55694 20.6156 8.80308C20.3694 9.04922 20.0356 9.1875 19.6875 9.1875H13.125Z"
        fill="#4A4C56"
      />
    </svg>
  );
}

function VirtualVisitsIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <path
        d="M17.25 4.5H6.75C6.55109 4.5 6.36032 4.42098 6.21967 4.28033C6.07902 4.13968 6 3.94891 6 3.75C6 3.55109 6.07902 3.36032 6.21967 3.21967C6.36032 3.07902 6.55109 3 6.75 3H17.25C17.4489 3 17.6397 3.07902 17.7803 3.21967C17.921 3.36032 18 3.55109 18 3.75C18 3.94891 17.921 4.13968 17.7803 4.28033C17.6397 4.42098 17.4489 4.5 17.25 4.5Z"
        fill="#4A4C56"
      />
      <path
        d="M18.75 6.75H5.25C5.05109 6.75 4.86032 6.67098 4.71967 6.53033C4.57902 6.38968 4.5 6.19891 4.5 6C4.5 5.80109 4.57902 5.61032 4.71967 5.46967C4.86032 5.32902 5.05109 5.25 5.25 5.25H18.75C18.9489 5.25 19.1397 5.32902 19.2803 5.46967C19.421 5.61032 19.5 5.80109 19.5 6C19.5 6.19891 19.421 6.38968 19.2803 6.53033C19.1397 6.67098 18.9489 6.75 18.75 6.75Z"
        fill="#4A4C56"
      />
      <path
        d="M19.6467 21H4.35328C3.79565 20.9994 3.26103 20.7776 2.86672 20.3833C2.47241 19.989 2.25062 19.4544 2.25 18.8967V9.60328C2.25062 9.04565 2.47241 8.51103 2.86672 8.11672C3.26103 7.72241 3.79565 7.50062 4.35328 7.5H19.6467C20.2044 7.50062 20.739 7.72241 21.1333 8.11672C21.5276 8.51103 21.7494 9.04565 21.75 9.60328V18.8967C21.7494 19.4544 21.5276 19.989 21.1333 20.3833C20.739 20.7776 20.2044 20.9994 19.6467 21Z"
        fill="#4A4C56"
      />
    </svg>
  );
}

function FurnitureIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <path
        d="M20.25 10.8141C19.7772 10.6065 19.2664 10.4996 18.75 10.5H5.25C4.73368 10.4995 4.22288 10.6063 3.75 10.8136C3.08166 11.1059 2.51294 11.5865 2.11336 12.1968C1.71377 12.8071 1.50064 13.5205 1.5 14.25V19.5C1.5 19.6989 1.57902 19.8897 1.71967 20.0303C1.86032 20.171 2.05109 20.25 2.25 20.25C2.44891 20.25 2.63968 20.171 2.78033 20.0303C2.92098 19.8897 3 19.6989 3 19.5V19.125C3.00122 19.0259 3.04112 18.9312 3.11118 18.8612C3.18124 18.7911 3.27592 18.7512 3.375 18.75H20.625C20.7241 18.7512 20.8188 18.7911 20.8888 18.8612C20.9589 18.9312 20.9988 19.0259 21 19.125V19.5C21 19.6989 21.079 19.8897 21.2197 20.0303C21.3603 20.171 21.5511 20.25 21.75 20.25C21.9489 20.25 22.1397 20.171 22.2803 20.0303C22.421 19.8897 22.5 19.6989 22.5 19.5V14.25C22.4993 13.5206 22.2861 12.8073 21.8865 12.1971C21.4869 11.5869 20.9183 11.1063 20.25 10.8141Z"
        fill="#4A4C56"
      />
      <path
        d="M17.625 3.75H6.375C5.67881 3.75 5.01113 4.02656 4.51884 4.51884C4.02656 5.01113 3.75 5.67881 3.75 6.375V9.75C3.75002 9.77906 3.75679 9.80771 3.76979 9.8337C3.78278 9.85969 3.80163 9.8823 3.82486 9.89976C3.84809 9.91721 3.87505 9.92903 3.90363 9.93428C3.93221 9.93953 3.96162 9.93806 3.98953 9.93C4.39897 9.81025 4.82341 9.74964 5.25 9.75H5.44828C5.49456 9.75029 5.53932 9.73346 5.57393 9.70274C5.60855 9.67202 5.63058 9.62958 5.63578 9.58359C5.67669 9.21712 5.85115 8.87856 6.12586 8.63256C6.40056 8.38656 6.75625 8.25037 7.125 8.25H9.75C10.119 8.25003 10.475 8.38606 10.75 8.63209C11.025 8.87812 11.1997 9.21688 11.2406 9.58359C11.2458 9.62958 11.2679 9.67202 11.3025 9.70274C11.3371 9.73346 11.3818 9.75029 11.4281 9.75H12.5747C12.621 9.75029 12.6657 9.73346 12.7003 9.70274C12.735 9.67202 12.757 9.62958 12.7622 9.58359C12.8031 9.21736 12.9773 8.87899 13.2517 8.63303C13.5261 8.38706 13.8815 8.25072 14.25 8.25H16.875C17.244 8.25003 17.6 8.38606 17.875 8.63209C18.15 8.87812 18.3247 9.21688 18.3656 9.58359C18.3708 9.62958 18.3929 9.67202 18.4275 9.70274C18.4621 9.73346 18.5068 9.75029 18.5531 9.75H18.75C19.1766 9.74979 19.6011 9.81057 20.0105 9.93047C20.0384 9.93854 20.0679 9.94 20.0965 9.93473C20.1251 9.92945 20.1521 9.91759 20.1753 9.90009C20.1986 9.88258 20.2174 9.8599 20.2304 9.83385C20.2433 9.8078 20.2501 9.7791 20.25 9.75V6.375C20.25 5.67881 19.9734 5.01113 19.4812 4.51884C18.9889 4.02656 18.3212 3.75 17.625 3.75Z"
        fill="#4A4C56"
      />
    </svg>
  );
}

function StagingIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <path
        d="M23.6053 5.91559C23.5503 5.80235 23.469 5.7039 23.3682 5.62846C23.2674 5.55302 23.15 5.50277 23.0258 5.4819C22.9016 5.46103 22.7743 5.47014 22.6544 5.50848C22.5344 5.54682 22.4254 5.61328 22.3364 5.70231L19.9387 8.09997C19.8409 8.19644 19.7091 8.25052 19.5717 8.25052C19.4343 8.25052 19.3025 8.19644 19.2047 8.09997L18.1509 7.04622C18.0545 6.94827 18.0005 6.81637 18.0005 6.67895C18.0005 6.54153 18.0545 6.40963 18.1509 6.31168L20.5359 3.92622C20.6272 3.83497 20.6947 3.72275 20.7325 3.59938C20.7704 3.476 20.7774 3.34523 20.7531 3.21851C20.7287 3.09178 20.6736 2.97295 20.5927 2.87243C20.5118 2.7719 20.4075 2.69273 20.2889 2.64184C18.4275 1.84497 16.1133 2.29262 14.6639 3.73356C13.4072 4.9809 13.0312 6.92106 13.6326 9.06325C13.6586 9.15518 13.6584 9.25252 13.6323 9.34439C13.6061 9.43626 13.555 9.51906 13.4845 9.58356L5.37982 17.114C5.11132 17.3556 4.89481 17.6493 4.74348 17.9772C4.59215 18.3051 4.50917 18.6604 4.49959 19.0215C4.49002 19.3825 4.55405 19.7417 4.68778 20.0772C4.82151 20.4127 5.02215 20.7175 5.27747 20.9729C5.53278 21.2283 5.83744 21.4291 6.17286 21.563C6.50829 21.6969 6.86746 21.7611 7.2285 21.7517C7.58955 21.7423 7.94489 21.6595 8.2729 21.5084C8.60091 21.3572 8.8947 21.1408 9.13639 20.8725L16.7344 12.7537C16.798 12.6848 16.8791 12.6346 16.9692 12.6084C17.0592 12.5822 17.1547 12.5811 17.2453 12.6051C19.3547 13.1676 21.2765 12.7926 22.5154 11.5739C23.2279 10.8707 23.7253 9.8784 23.9165 8.77497C24.0961 7.73434 23.9826 6.69184 23.6053 5.91559Z"
        fill="#4A4C56"
      />
      <path
        d="M20.4998 17.7379C19.8464 17.1946 18.4505 15.9379 17.0278 14.6338L13.9308 17.9436C15.2545 19.3499 16.4527 20.6554 16.9777 21.2661C17.1071 21.4142 17.2613 21.5313 17.4343 21.6138C17.6073 21.6963 17.7953 21.7427 17.9869 21.7499H18.0384C18.4067 21.7488 18.76 21.6038 19.0228 21.3458L19.0261 21.3425L20.5931 19.7783C20.7293 19.6425 20.8355 19.4798 20.9051 19.3005C20.9747 19.1213 21.0061 18.9294 20.9972 18.7374C20.9884 18.5453 20.9396 18.3572 20.8538 18.185C20.7681 18.0129 20.6474 17.8606 20.4994 17.7379H20.4998Z"
        fill="#4A4C56"
      />
    </svg>
  );
}

function HubIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <path
        d="M12 0.5C5.93466 0.5 1 5.43466 1 11.5C1 17.5653 5.93466 22.5 12 22.5C18.0653 22.5 23 17.5653 23 11.5C23 5.43466 18.0653 0.5 12 0.5ZM9.34413 6.67798C10.0142 5.96774 10.9571 5.57692 12 5.57692C13.0429 5.57692 13.9774 5.97038 14.65 6.68433C15.3317 7.40779 15.6633 8.37981 15.585 9.42481C15.4285 11.5 13.8208 13.1923 12 13.1923C10.1792 13.1923 8.56832 11.5 8.41495 9.42428C8.33721 8.37082 8.66827 7.39563 9.34413 6.67798ZM12 20.8077C10.7575 20.8085 9.5274 20.5598 8.38278 20.0763C7.23815 19.5929 6.20226 18.8845 5.33654 17.9932C5.83236 17.2861 6.46412 16.6849 7.1949 16.2247C8.54293 15.3606 10.249 14.8846 12 14.8846C13.751 14.8846 15.4571 15.3606 16.8035 16.2247C17.5349 16.6847 18.1672 17.2859 18.6635 17.9932C17.7978 18.8846 16.7619 19.593 15.6173 20.0765C14.4727 20.56 13.2426 20.8086 12 20.8077Z"
        fill="#4A4C56"
      />
    </svg>
  );
}

function TeamIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <path
        d="M15.75 12C14.7862 12 13.8543 11.5697 13.125 10.7888C12.4157 10.027 11.9826 9.01125 11.9062 7.92938C11.8247 6.77531 12.1767 5.71406 12.8972 4.94063C13.6176 4.16719 14.625 3.75 15.75 3.75C16.867 3.75 17.8772 4.17469 18.5953 4.94625C19.3204 5.72531 19.6734 6.78469 19.5918 7.92891C19.5136 9.01219 19.0809 10.0275 18.3731 10.7883C17.6456 11.5697 16.7142 12 15.75 12Z"
        fill="#4A4C56"
      />
      <path
        d="M21.9295 20.25H9.5709C9.3722 20.2511 9.17591 20.2065 8.99713 20.1198C8.81835 20.0331 8.66184 19.9065 8.53965 19.7498C8.41004 19.58 8.32054 19.383 8.27784 19.1736C8.23514 18.9643 8.24036 18.748 8.29309 18.5409C8.68778 16.9561 9.66559 15.6417 11.1206 14.7403C12.412 13.9406 14.0559 13.5 15.75 13.5C17.4773 13.5 19.0781 13.9219 20.377 14.7211C21.8353 15.6178 22.8145 16.9397 23.2073 18.5438C23.2594 18.751 23.264 18.9673 23.2209 19.1765C23.1777 19.3857 23.0878 19.5825 22.9579 19.7522C22.8359 19.9082 22.6797 20.0341 22.5015 20.1204C22.3232 20.2067 22.1275 20.251 21.9295 20.25Z"
        fill="#4A4C56"
      />
      <path
        d="M6.89068 12.1875C5.24115 12.1875 3.79083 10.6538 3.6563 8.76891C3.58974 7.80328 3.89068 6.91031 4.50005 6.25547C5.10287 5.60719 5.95318 5.25 6.89068 5.25C7.82818 5.25 8.67193 5.60906 9.27802 6.26109C9.89208 6.92109 10.1921 7.81219 10.1218 8.76984C9.98724 10.6542 8.5374 12.1875 6.89068 12.1875Z"
        fill="#4A4C56"
      />
      <path
        d="M9.96838 13.6618C9.14385 13.2587 8.0737 13.0571 6.89104 13.0571C5.5101 13.0571 4.16901 13.4171 3.11432 14.0706C1.91854 14.8126 1.11417 15.8931 0.789322 17.1976C0.741783 17.3852 0.737287 17.5812 0.776169 17.7708C0.815051 17.9604 0.896305 18.1388 1.01385 18.2926C1.12539 18.4358 1.26828 18.5515 1.43154 18.6308C1.5948 18.7101 1.77407 18.7509 1.95557 18.7501H7.1587C7.24652 18.7501 7.33155 18.7193 7.39896 18.663C7.46638 18.6067 7.5119 18.5285 7.5276 18.4421C7.53276 18.4126 7.53932 18.3831 7.54682 18.354C7.94432 16.7574 8.87573 15.4084 10.252 14.4249C10.3026 14.3885 10.3433 14.3399 10.3704 14.2837C10.3975 14.2275 10.4102 14.1654 10.4073 14.1031C10.4044 14.0408 10.3859 13.9802 10.3536 13.9268C10.3214 13.8734 10.2763 13.8289 10.2224 13.7973C10.1489 13.7542 10.0645 13.7087 9.96838 13.6618Z"
        fill="#4A4C56"
      />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 6.74985H13.6289C13.7841 7.18837 14.0714 7.56801 14.4512 7.83652C14.8311 8.10503 15.2848 8.24921 15.75 8.24921C16.2152 8.24921 16.6689 8.10503 17.0488 7.83652C17.4286 7.56801 17.7159 7.18837 17.8711 6.74985H21C21.1989 6.74985 21.3897 6.67083 21.5303 6.53018C21.671 6.38953 21.75 6.19876 21.75 5.99985C21.75 5.80094 21.671 5.61017 21.5303 5.46952C21.3897 5.32887 21.1989 5.24985 21 5.24985H17.8711C17.7159 4.81133 17.4286 4.43168 17.0488 4.16317C16.6689 3.89467 16.2152 3.75049 15.75 3.75049C15.2848 3.75049 14.8311 3.89467 14.4512 4.16317C14.0714 4.43168 13.7841 4.81133 13.6289 5.24985H3C2.80109 5.24985 2.61032 5.32887 2.46967 5.46952C2.32902 5.61017 2.25 5.80094 2.25 5.99985C2.25 6.19876 2.32902 6.38953 2.46967 6.53018C2.61032 6.67083 2.80109 6.74985 3 6.74985Z"
        fill="#636363"
      />
      <path
        d="M21 17.2498H17.8711C17.7159 16.8113 17.4286 16.4317 17.0488 16.1632C16.6689 15.8947 16.2152 15.7505 15.75 15.7505C15.2848 15.7505 14.8311 15.8947 14.4512 16.1632C14.0714 16.4317 13.7841 16.8113 13.6289 17.2498H3C2.80109 17.2498 2.61032 17.3289 2.46967 17.4695C2.32902 17.6102 2.25 17.8009 2.25 17.9998C2.25 18.1988 2.32902 18.3895 2.46967 18.5302C2.61032 18.6708 2.80109 18.7498 3 18.7498H13.6289C13.7841 19.1884 14.0714 19.568 14.4512 19.8365C14.8311 20.105 15.2848 20.2492 15.75 20.2492C16.2152 20.2492 16.6689 20.105 17.0488 19.8365C17.4286 19.568 17.7159 19.1884 17.8711 18.7498H21C21.1989 18.7498 21.3897 18.6708 21.5303 18.5302C21.671 18.3895 21.75 18.1988 21.75 17.9998C21.75 17.8009 21.671 17.6102 21.5303 17.4695C21.3897 17.3289 21.1989 17.2498 21 17.2498Z"
        fill="#636363"
      />
      <path
        d="M21 11.2498H10.3711C10.2159 10.8113 9.92861 10.4317 9.54876 10.1632C9.16891 9.89466 8.71517 9.75049 8.25 9.75049C7.78483 9.75049 7.33109 9.89466 6.95124 10.1632C6.57139 10.4317 6.2841 10.8113 6.12891 11.2498H3C2.80109 11.2498 2.61032 11.3289 2.46967 11.4695C2.32902 11.6102 2.25 11.8009 2.25 11.9998C2.25 12.1988 2.32902 12.3895 2.46967 12.5302C2.61032 12.6708 2.80109 12.7498 3 12.7498H6.12891C6.2841 13.1884 6.57139 13.568 6.95124 13.8365C7.33109 14.105 7.78483 14.2492 8.25 14.2492C8.71517 14.2492 9.16891 14.105 9.54876 13.8365C9.92861 13.568 10.2159 13.1884 10.3711 12.7498H21C21.1989 12.7498 21.3897 12.6708 21.5303 12.5302C21.671 12.3895 21.75 12.1988 21.75 11.9998C21.75 11.8009 21.671 11.6102 21.5303 11.4695C21.3897 11.3289 21.1989 11.2498 21 11.2498Z"
        fill="#636363"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24.8438 4.6875H5.15625C4.28629 4.68843 3.45224 5.03443 2.83708 5.64958C2.22193 6.26474 1.87593 7.09879 1.875 7.96875V22.0312C1.87593 22.9012 2.22193 23.7353 2.83708 24.3504C3.45224 24.9656 4.28629 25.3116 5.15625 25.3125H24.8438C25.7137 25.3116 26.5478 24.9656 27.1629 24.3504C27.7781 23.7353 28.1241 22.9012 28.125 22.0312V7.96875C28.1241 7.09879 27.7781 6.26474 27.1629 5.64958C26.5478 5.03443 25.7137 4.68843 24.8438 4.6875ZM24.0129 10.115L15.5754 16.6775C15.4109 16.8054 15.2084 16.8749 15 16.8749C14.7916 16.8749 14.5891 16.8054 14.4246 16.6775L5.98711 10.115C5.88798 10.0402 5.80471 9.94636 5.74215 9.83904C5.67959 9.73172 5.63898 9.61303 5.62269 9.48988C5.60639 9.36673 5.61473 9.24157 5.64723 9.12167C5.67972 9.00177 5.73572 8.88952 5.81197 8.79145C5.88822 8.69338 5.9832 8.61145 6.09139 8.5504C6.19959 8.48936 6.31883 8.45042 6.4422 8.43586C6.56557 8.4213 6.6906 8.43141 6.81003 8.46559C6.92946 8.49976 7.0409 8.55734 7.13789 8.63496L15 14.7498L22.8621 8.63496C23.0587 8.4865 23.3058 8.42138 23.5501 8.4537C23.7943 8.48601 24.016 8.61316 24.1672 8.80765C24.3184 9.00214 24.387 9.24833 24.3581 9.49298C24.3292 9.73764 24.2052 9.9611 24.0129 10.115Z"
        fill="#4A4C56"
      />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25.786 19.9986C25.6888 19.8814 25.5933 19.7643 25.4995 19.6512C24.2105 18.092 23.4306 17.151 23.4306 12.7371C23.4306 10.452 22.8839 8.57695 21.8064 7.1707C21.0118 6.13184 19.9378 5.34375 18.5222 4.76133C18.504 4.75119 18.4877 4.7379 18.4741 4.72207C17.965 3.01699 16.5716 1.875 15.0001 1.875C13.4286 1.875 12.0359 3.01699 11.5267 4.72031C11.5131 4.73556 11.497 4.74843 11.4792 4.7584C8.1757 6.11836 6.57023 8.72754 6.57023 12.7354C6.57023 17.151 5.79152 18.092 4.50129 19.6494C4.40754 19.7625 4.31203 19.8773 4.21476 19.9969C3.96351 20.2999 3.80433 20.6685 3.75604 21.0592C3.70775 21.4498 3.77239 21.8461 3.9423 22.2012C4.30382 22.9629 5.07433 23.4357 5.95382 23.4357H24.0528C24.9282 23.4357 25.6935 22.9635 26.0562 22.2053C26.2268 21.8501 26.2921 21.4535 26.2442 21.0624C26.1963 20.6713 26.0373 20.3021 25.786 19.9986Z"
        fill="#4A4C56"
      />
      <path
        d="M14.9999 28.125C15.8466 28.1243 16.6773 27.8945 17.404 27.4599C18.1306 27.0253 18.7261 26.4021 19.1272 25.6564C19.1461 25.6207 19.1555 25.5807 19.1543 25.5403C19.1532 25.4999 19.1416 25.4605 19.1208 25.4258C19.0999 25.3912 19.0704 25.3626 19.0352 25.3427C19 25.3229 18.9602 25.3125 18.9198 25.3125H11.0811C11.0407 25.3124 11.0009 25.3227 10.9656 25.3425C10.9303 25.3623 10.9007 25.391 10.8798 25.4256C10.8588 25.4602 10.8472 25.4997 10.846 25.5401C10.8449 25.5806 10.8542 25.6207 10.8731 25.6564C11.2742 26.402 11.8696 27.0251 12.5961 27.4597C13.3227 27.8943 14.1533 28.1242 14.9999 28.125Z"
        fill="#4A4C56"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg
      width="37"
      height="37"
      viewBox="0 0 37 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M29.4844 3.46875H7.51562C6.13614 3.47028 4.81359 4.01896 3.83815 4.9944C2.86271 5.96984 2.31403 7.29239 2.3125 8.67188V22.5469C2.31403 23.9264 2.86271 25.2489 3.83815 26.2243C4.81359 27.1998 6.13614 27.7485 7.51562 27.75H9.25V32.375C9.24994 32.5948 9.31256 32.8102 9.43052 32.9957C9.54847 33.1812 9.71687 33.3293 9.91598 33.4225C10.1151 33.5157 10.3366 33.5502 10.5547 33.522C10.7727 33.4938 10.9782 33.404 11.147 33.2631L17.7586 27.75H29.4844C30.8639 27.7485 32.1864 27.1998 33.1618 26.2243C34.1373 25.2489 34.686 23.9264 34.6875 22.5469V8.67188C34.686 7.29239 34.1373 5.96984 33.1618 4.9944C32.1864 4.01896 30.8639 3.47028 29.4844 3.46875ZM11.5625 17.9219C11.1051 17.9219 10.658 17.7862 10.2777 17.5321C9.89746 17.278 9.60106 16.9169 9.42603 16.4943C9.251 16.0718 9.20521 15.6068 9.29443 15.1582C9.38366 14.7096 9.60391 14.2976 9.92732 13.9742C10.2507 13.6508 10.6628 13.4305 11.1114 13.3413C11.5599 13.2521 12.0249 13.2979 12.4475 13.4729C12.87 13.6479 13.2312 13.9443 13.4853 14.3246C13.7394 14.7049 13.875 15.152 13.875 15.6094C13.875 16.2227 13.6314 16.8109 13.1977 17.2446C12.764 17.6782 12.1758 17.9219 11.5625 17.9219ZM18.5 17.9219C18.0426 17.9219 17.5955 17.7862 17.2152 17.5321C16.835 17.278 16.5386 16.9169 16.3635 16.4943C16.1885 16.0718 16.1427 15.6068 16.2319 15.1582C16.3212 14.7096 16.5414 14.2976 16.8648 13.9742C17.1882 13.6508 17.6003 13.4305 18.0489 13.3413C18.4974 13.2521 18.9624 13.2979 19.385 13.4729C19.8075 13.6479 20.1687 13.9443 20.4228 14.3246C20.6769 14.7049 20.8125 15.152 20.8125 15.6094C20.8125 16.2227 20.5689 16.8109 20.1352 17.2446C19.7015 17.6782 19.1133 17.9219 18.5 17.9219ZM25.4375 17.9219C24.9801 17.9219 24.533 17.7862 24.1527 17.5321C23.7725 17.278 23.4761 16.9169 23.301 16.4943C23.126 16.0718 23.0802 15.6068 23.1694 15.1582C23.2587 14.7096 23.4789 14.2976 23.8023 13.9742C24.1257 13.6508 24.5378 13.4305 24.9864 13.3413C25.4349 13.2521 25.8999 13.2979 26.3225 13.4729C26.745 13.6479 27.1062 13.9443 27.3603 14.3246C27.6144 14.7049 27.75 15.152 27.75 15.6094C27.75 16.2227 27.5064 16.8109 27.0727 17.2446C26.639 17.6782 26.0508 17.9219 25.4375 17.9219Z"
        fill="white"
      />
    </svg>
  );
}

const navItems = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard", active: false, icon: "dashboard" },
  { id: "visits", label: "Virtual visits", href: "/virtual-visits", active: true, icon: "visits" },
  { id: "furniture", label: "Furniture Catalog", href: "/furniture-catalog", active: false, icon: "furniture" },
  { id: "staging", label: "Staging", href: "/staging", active: false, icon: "staging" },
  { id: "hub", label: "Hub & Avatar", href: "/hub-avatar", active: false, icon: "hub", badge: 3 },
  { id: "team", label: "Team", href: "/team", active: false, icon: "team" },
];

function NavItemIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "dashboard":
      return <DashboardIcon />;
    case "visits":
      return <VirtualVisitsIcon />;
    case "furniture":
      return <FurnitureIcon />;
    case "staging":
      return <StagingIcon />;
    case "hub":
      return <HubIcon />;
    case "team":
      return <TeamIcon />;
    default:
      return null;
  }
}

export default function Index() {
  const [search, setSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="dashboard-bg min-h-screen relative overflow-hidden font-lato">
      {/* Background overlay image */}
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/49dd96ddcd91b3295c6ae0adf022b4909dcfb9e8?width=3840"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-100 pointer-events-none select-none"
        aria-hidden="true"
      />

      <div className="relative min-h-screen flex flex-col p-4 md:p-6 xl:px-[116px] xl:pt-[85px] xl:pb-10 gap-4 xl:gap-8">
        {/* Header */}
        <header
          className="rounded-[20px] flex items-center justify-between px-4 md:px-7 h-[72px] md:h-[100px] flex-shrink-0"
          style={{ background: "rgba(255, 255, 255, 0.33)" }}
        >
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/a55590721e3b8a09945db9b844ba170ea01c82d9?width=434"
            alt="Logo"
            className="h-[40px] md:h-[65px] w-auto"
          />

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-[#4A4C56]" />
            ) : (
              <Menu className="w-6 h-6 text-[#4A4C56]" />
            )}
          </button>

          {/* User menu */}
          <div className="hidden md:flex items-center gap-2">
            {/* Mail */}
            <div
              className="w-12 h-12 rounded-[27px] border border-white/44 flex items-center justify-center"
              style={{ background: "rgba(255, 255, 255, 0.44)" }}
            >
              <MailIcon />
            </div>

            <div
              className="w-px h-5"
              style={{ background: "rgba(255, 255, 255, 0.44)" }}
            />

            {/* Bell with badge */}
            <div className="relative">
              <div
                className="w-12 h-12 rounded-[27px] border border-white/44 flex items-center justify-center"
                style={{ background: "rgba(255, 255, 255, 0.44)" }}
              >
                <BellIcon />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#F53427] flex items-center justify-center">
                <span className="text-white text-[11px] font-medium font-lato leading-none">
                  1
                </span>
              </div>
            </div>

            <div
              className="w-px h-5"
              style={{ background: "rgba(255, 255, 255, 0.44)" }}
            />

            {/* User info */}
            <div className="flex items-center gap-3">
              <div className="w-[54px] h-[54px] rounded-full bg-[#B8CDE8] overflow-hidden flex-shrink-0">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/015d1ee0b827977602b52af695ac3d845f7c9fe9?width=108"
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[#1D1F2C] font-lato text-[16.83px] font-medium leading-6 tracking-[0.084px]">
                  Abdelali H.
                </span>
                <span className="text-[#4A4C56] font-lato text-sm font-medium leading-5 tracking-[0.072px]">
                  Admin
                </span>
              </div>
              <div className="w-7 h-7 flex items-center justify-center">
                <ChevronDown className="w-[22px] h-[22px] text-[#4A4C56]" />
              </div>
            </div>
          </div>
        </header>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div
            className="md:hidden rounded-[20px] p-4 flex flex-col gap-1"
            style={{ background: "rgba(255, 255, 255, 0.33)" }}
          >
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 h-12 px-3 rounded-[10px] cursor-pointer ${
                  item.active ? "bg-white/44" : ""
                }`}
              >
                <NavItemIcon icon={item.icon} />
                <span className="text-[#4A4C56] text-base font-roboto">
                  {item.label}
                </span>
                {item.badge && (
                  <div className="ml-auto w-5 h-5 rounded-full bg-[#F53427] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-medium">
                      {item.badge}
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}

        {/* Main body */}
        <div className="flex gap-4 xl:gap-8 flex-1 min-h-0">
          {/* Sidebar */}
          <aside
            className="hidden md:flex w-[224px] flex-shrink-0 rounded-[20px] flex-col py-[30px] px-[19px] justify-between"
            style={{ background: "rgba(255, 255, 255, 0.33)" }}
          >
            {/* Nav items */}
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                  className={`flex items-center gap-2 h-[52px] px-2 rounded-[10px] cursor-pointer transition-colors ${
                    item.active ? "bg-white/44" : "hover:bg-white/20"
                  }`}
                  style={
                    item.active
                      ? { background: "rgba(255, 255, 255, 0.44)" }
                      : {}
                  }
                >
                  <NavItemIcon icon={item.icon} />
                  <span
                    className={`text-[#4A4C56] text-base font-roboto whitespace-nowrap leading-4 ${
                      item.active ? "font-medium" : "font-normal"
                    }`}
                  >
                    {item.label}
                  </span>
                  {item.badge && (
                    <div className="ml-auto w-5 h-5 rounded-full bg-[#F53427] flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-medium">
                        {item.badge}
                      </span>
                    </div>
                  )}
                </Link>
              ))}
            </nav>

            {/* Upgrade card */}
            <div
              className="rounded-[13px] p-4 shadow-[0_0_22px_0_rgba(0,0,0,0.22)]"
              style={{ background: "rgba(255, 255, 255, 0.33)" }}
            >
              <p className="text-black font-lato text-[13px] font-normal leading-[149%] tracking-[-0.262px] text-center mb-4">
                Upgrade to our Pro Plan and unlock your full potential today!
              </p>
              <button className="w-full flex items-center justify-center gap-1 bg-black text-white rounded-[9px] py-2.5 px-4 text-[11px] font-semibold font-inter leading-[130%]">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0"
                >
                  <path
                    d="M9.132 4.566V9.132V13.698M13.698 9.132H4.566"
                    stroke="white"
                    strokeWidth="1.2176"
                    strokeLinecap="round"
                  />
                </svg>
                Créer une visite
              </button>
            </div>
          </aside>

          {/* Main content */}
          <main
            className="flex-1 min-w-0 rounded-[20px] overflow-hidden flex flex-col"
            style={{ background: "rgba(255, 255, 255, 0.33)" }}
          >
            {/* Controls bar */}
            <div className="flex items-center gap-2 md:gap-3 p-4 md:p-[30px_29px_0]">
              {/* Search */}
              <div className="flex-1 max-w-[447px] bg-white rounded-[10px] shadow-[0_4px_11px_0_rgba(0,0,0,0.05)] h-[53px] flex items-center px-4 md:px-5 gap-2 md:gap-3">
                <Search className="w-5 h-5 text-[#969696] flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-[#969696] font-medium font-inter text-base placeholder:text-[#969696] min-w-0"
                />
              </div>

              <div className="flex-1" />

              {/* Filter */}
              <button className="hidden sm:flex items-center gap-2 h-[53px] px-4 md:px-7 bg-white rounded-[10px] shadow-[0_4px_11px_0_rgba(0,0,0,0.05)] flex-shrink-0">
                <FilterIcon />
                <span className="text-[#636363] font-medium font-inter text-base hidden md:block">
                  Filter
                </span>
              </button>

              {/* New visit */}
              <button className="flex items-center gap-2 h-[53px] px-4 md:px-7 bg-black rounded-[10px] shadow-[0_4px_11px_0_rgba(0,0,0,0.05)] flex-shrink-0">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0"
                >
                  <path
                    d="M4.566 0V4.566V9.132M9.132 4.566H0"
                    stroke="white"
                    strokeWidth="1.2176"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-white font-medium font-inter text-base">
                  New visit
                </span>
              </button>
            </div>

            {/* Table */}
            <div className="px-4 md:px-[29px] pt-4 md:pt-[27px] pb-4 flex flex-col flex-1 overflow-auto">
              {/* Table header */}
              <div
                className="rounded-[10px] h-[52px] flex items-center px-4 md:px-6 mb-0 flex-shrink-0"
                style={{ background: "rgba(255, 255, 255, 0.77)" }}
              >
                {/* Checkbox */}
                <div className="w-5 h-5 rounded-[5px] border border-[#B8B8B8] bg-white shadow-sm flex-shrink-0 mr-4" />
                {/* ID */}
                <div className="w-12 md:w-14 flex-shrink-0">
                  <span className="text-[#21272A] font-inter text-base font-normal leading-5">
                    ID
                  </span>
                </div>
                {/* Thumbnail spacer */}
                <div className="w-[120px] lg:w-[137px] flex-shrink-0 mr-3 md:mr-4" />
                {/* Property label */}
                <div className="flex-1 min-w-0">
                  <span className="text-[#4A4C56] font-lato text-base font-normal leading-5">
                    Property
                  </span>
                </div>
                {/* Status label */}
                <div className="w-[100px] lg:w-[120px] flex-shrink-0 flex justify-center">
                  <span className="text-[#4A4C56] font-lato text-base font-normal leading-5">
                    Status
                  </span>
                </div>
                {/* Assigned label */}
                <div className="w-[70px] lg:w-[90px] flex-shrink-0 justify-center hidden sm:flex">
                  <span className="text-[#4A4C56] font-lato text-base font-normal leading-5">
                    Assigned
                  </span>
                </div>
                {/* Actions spacer */}
                <div className="w-9 flex-shrink-0" />
              </div>

              {/* Visit rows */}
              <div className="flex flex-col">
                {visits
                  .filter(
                    (v) =>
                      search === "" ||
                      v.title.toLowerCase().includes(search.toLowerCase()) ||
                      v.address.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((visit, index) => (
                    <VisitRow
                      key={`${visit.id}-${index}`}
                      visit={visit}
                      isAlternate={index % 2 === 1}
                    />
                  ))}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Chat button */}
      <button
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-[70px] h-[70px] rounded-full flex items-center justify-center shadow-[0_0_22px_0_rgba(0,0,0,0.11)]"
        style={{ background: "rgba(255, 255, 255, 0.22)" }}
      >
        <ChatIcon />
      </button>
    </div>
  );
}
