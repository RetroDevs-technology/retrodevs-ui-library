import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/core/tabs";

/**
 * Base tabs component that provides a clean, standard shadcn/ui tabs interface.
 * Uses standard horizontal tabs layout with proper styling.
 *
 * @param props - BaseTab component props
 * @param props.activeTab - Controlled active tab value
 * @param props.setActiveTab - Callback when active tab changes
 * @param props.tab - Array of tab configurations
 * @returns Tabs component with standard styling
 */
export function BaseTab({
  activeTab,
  setActiveTab,
  tab,
}: {
  activeTab?: string;
  setActiveTab?: (activeTab: string) => void;
  tab: ITabProps[];
}) {
  return (
    <Tabs
      defaultValue={tab[0]?.value}
      value={activeTab}
      onValueChange={setActiveTab}
    >
      <TabsList>
        {tab.map((item) => (
          <TabsTrigger key={item.name} value={item.value}>
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="mr-2 h-4 w-4"
              />
            )}
            {item.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {tab.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          {item.element}
        </TabsContent>
      ))}
    </Tabs>
  );
}

/**
 * Tab configuration interface.
 */
export interface ITabProps {
  /** Tab value identifier */
  value: "profile" | "payout" | "settings" | "support";
  /** Optional image source URL for the tab icon */
  image?: string;
  /** Display name for the tab */
  name: string;
  /** Content element to display when tab is active */
  element: React.ReactNode;
}
