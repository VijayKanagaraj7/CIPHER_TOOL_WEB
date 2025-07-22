import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface CipherSectionProps {
  title: string;
  description: string;
  icon: ReactNode;
  gradientClass: string;
  children: ReactNode;
}

export function CipherSection({ 
  title, 
  description, 
  icon, 
  gradientClass, 
  children 
}: CipherSectionProps) {
  return (
    <Card className="border-slate-700 bg-slate-800">
      <CardHeader className={`${gradientClass} text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              {icon}
            </div>
            <CardTitle className="text-xl">{title}</CardTitle>
          </div>
        </div>
        <p className="text-opacity-90 text-sm mt-2">
          {description}
        </p>
      </CardHeader>
      <CardContent className="p-6">
        {children}
      </CardContent>
    </Card>
  );
}
