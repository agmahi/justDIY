import { LucideIcon } from "lucide-react";
import {
  CreditCard,
  Wallet,
  XCircle,
  ShieldCheck,
  BarChart,
  LineChart,
  Share2,
  MessageCircle,
  Mail,
  User,
  UserCircle,
  Smartphone,
  FileText,
  AlertTriangle,
  Globe,
  Clock,
  Gavel,
  ClipboardX
} from "lucide-react";

const keywordIconMap: Record<string, LucideIcon> = {
  subscription: CreditCard,
  payment: Wallet,
  cancel: XCircle,
  privacy: ShieldCheck,
  data: BarChart,
  analytics: LineChart,
  sharing: Share2,
  communication: MessageCircle,
  email: Mail,
  user: User,
  account: UserCircle,
  device: Smartphone,
  jurisdiction: Globe,
  time: Clock,
  terms: FileText,
  gavel: Gavel,
  dispute: ClipboardX,
  default: AlertTriangle
};

export const getIconsFromPrompt = (prompt: string | undefined): LucideIcon[] => {
  if (!prompt) return [FileText];

  const icons: LucideIcon[] = [];
  const seen = new Set<string>();

  const words = prompt.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);

  for (const word of words) {
    if (keywordIconMap[word] && !seen.has(word)) {
      icons.push(keywordIconMap[word]);
      seen.add(word);
    }
  }

  if (icons.length === 0) {
    icons.push(AlertTriangle);
  }

  return icons;
};