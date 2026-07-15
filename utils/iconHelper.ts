import { 
  Clock, 
  Package, 
  ShoppingCart, 
  MapPin, 
  Sparkles, 
  FolderKanban, 
  Warehouse, 
  Cpu, 
  Box, 
  Globe, 
  HelpCircle 
} from "lucide-react";
import React from "react";

const iconMap: Record<string, React.ComponentType<any>> = {
  Clock,
  Package,
  ShoppingCart,
  MapPin,
  Sparkles,
  FolderKanban,
  Warehouse,
  Cpu,
  Box,
  Globe
};

export function getIconComponent(iconName: string): React.ComponentType<any> {
  const Icon = iconMap[iconName];
  return Icon || HelpCircle;
}
