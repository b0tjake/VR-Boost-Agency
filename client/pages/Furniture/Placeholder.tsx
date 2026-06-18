import DashboardLayout from "@/components/DashboardLayout";

interface PlaceholderProps {
  title: string;
}

export default function Placeholder({ title }: PlaceholderProps) {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-white/50 flex items-center justify-center mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="#83889D"/>
          </svg>
        </div>
        <h2 className="text-2xl font-lato font-medium text-app-dark mb-2">{title}</h2>
        <p className="text-app-muted font-lato text-base max-w-sm">
          This page is coming soon. Continue prompting to fill in the content for this section.
        </p>
      </div>
    </DashboardLayout>
  );
}
