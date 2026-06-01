import {
  Award,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Factory,
  Flame,
  Gauge,
  Handshake,
  Phone,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Truck,
  type LucideIcon,
  Wrench,
} from 'lucide-react';
import type { IconName } from '@/data/site';

const iconMap: Record<IconName, LucideIcon> = {
  award: Award,
  check: CheckCircle2,
  clipboard: ClipboardCheck,
  clock: Clock3,
  factory: Factory,
  flame: Flame,
  gauge: Gauge,
  handshake: Handshake,
  phone: Phone,
  shield: ShieldCheck,
  snowflake: Snowflake,
  sparkles: Sparkles,
  truck: Truck,
  wrench: Wrench,
};

export function BrandIcon({ name, size = 22 }: { name: IconName; size?: number }) {
  const Component = iconMap[name];
  return <Component size={size} strokeWidth={1.9} />;
}
