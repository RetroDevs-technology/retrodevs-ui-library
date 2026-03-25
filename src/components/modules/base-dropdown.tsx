/**
 * A reusable dropdown menu component built on top of shadcn/ui DropdownMenu.
 * Supports click actions, icons, and custom positioning.
 * Navigation should be handled by consumers in onClick handlers.
 *
 * @example
 * ```tsx
 * <BaseDropdown
 *   trigger={<Button>Menu</Button>}
 *   items={[
 *     { label: 'Profile', onClick: () => navigate('/profile'), icon: <UserIcon /> },
 *     { label: 'Settings', onClick: () => handleSettings(), icon: <SettingsIcon /> },
 *     { label: 'Logout', onClick: () => handleLogout(), icon: <LogoutIcon /> }
 *   ]}
 *   align="end"
 *   side="bottom"
 *   header={<UserInfo />}
 * />
 * ```
 */
"use client";

import * as React from "react";
import { type ReactNode, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../core/dropdown-menu";
import { cn } from "@/lib/utils";

interface DropdownItemProps {
  /** Click handler for menu items */
  onClick?: () => void;
  /** Optional icon to display before the label */
  icon?: ReactNode;
  /** Display text for the menu item */
  label: string;
}

interface CustomDropdownProps {
  /** The trigger element that opens the dropdown (usually a button) */
  trigger: ReactNode;
  /** Array of menu items to display */
  items: DropdownItemProps[];
  /** Additional CSS classes for the dropdown content */
  className?: string;
  /** Horizontal alignment of the dropdown relative to the trigger */
  align?: "start" | "center" | "end";
  /** Position of the dropdown relative to the trigger */
  side?: "top" | "right" | "bottom" | "left";
  /** Optional header content to display above the menu items */
  header?: ReactNode;
}

/**
 * Base dropdown component that provides a consistent way to display dropdown menus.
 * Supports click actions, icons, custom positioning, and optional header content.
 *
 * @param props - BaseDropdown component props
 * @param props.trigger - Element that opens the dropdown
 * @param props.items - Array of menu items with labels, icons, and click handlers
 * @param props.className - Additional CSS classes
 * @param props.align - Horizontal alignment (default: "end")
 * @param props.side - Position relative to trigger (default: "bottom")
 * @param props.header - Optional header content
 * @returns Dropdown menu component
 */
function BaseDropdown({
  trigger,
  items,
  className = "",
  align = "end",
  side = "bottom",
  header,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setIsOpen(false);
    };
  }, []);


  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger render={React.isValidElement(trigger) ? trigger : <button>{trigger}</button>} />
      <DropdownMenuContent
        className={cn("py-2 rounded-lg border-border bg-popover", className)}
        align={align}
        side={side}
      >
        {header && (
          <div className="flex flex-col justify-center items-center px-4 pb-4">
            {header}
          </div>
        )}

        {items.map((item, index) => (
          <DropdownMenuItem
            key={item.label}
            className={cn(
              "px-2 py-2 cursor-pointer text-popover-foreground rounded-none",
              index !== items.length - 1 ? "border-b border-border" : ""
            )}
            onClick={(event) => {
              event.preventDefault();
              setIsOpen(false);
              item.onClick?.();
            }}
          >
            <div className="flex items-center w-full text-base">
              {item.icon && <span className="mr-3">{item.icon}</span>}
              {item.label}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default BaseDropdown;
