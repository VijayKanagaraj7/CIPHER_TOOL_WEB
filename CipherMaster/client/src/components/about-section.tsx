import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, AlertTriangle, Lightbulb } from "lucide-react";

export function AboutSection() {
  return (
    <Card className="border-slate-700 bg-slate-800">
      <CardHeader className="cipher-gradient-purple text-white">
        <CardTitle className="text-xl flex items-center">
          <Book className="w-5 h-5 mr-3" />
          About Classical Ciphers
        </CardTitle>
        <p className="text-purple-100 text-sm">
          Learn about the history and mathematics behind these encryption techniques
        </p>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-medium text-slate-300 mb-4">Historical Context</h4>
            <div className="text-slate-300 space-y-4">
              <p>
                Classical ciphers like Rail Fence and Row Transposition were among the earliest forms of cryptography, 
                used throughout history to protect military communications and diplomatic messages.
              </p>
              <p>
                The Rail Fence cipher, also known as the Zigzag cipher, gets its name from the visual pattern 
                created when writing the message. It was simple enough to be implemented by hand in the field.
              </p>
              <p>
                Row Transposition ciphers provided better security by using variable keys, making them harder 
                to break through frequency analysis alone.
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium text-slate-300 mb-4">Security Considerations</h4>
            <div className="space-y-3">
              <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                <h5 className="font-medium text-amber-400 mb-2 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Important Note
                </h5>
                <p className="text-sm text-slate-300">
                  These classical ciphers are for educational purposes only. They provide minimal security 
                  by modern standards and should not be used for protecting sensitive information.
                </p>
              </div>
              
              <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                <h5 className="font-medium text-blue-400 mb-2 flex items-center">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Learning Value
                </h5>
                <p className="text-sm text-slate-300">
                  Understanding these ciphers helps build foundation knowledge for modern cryptographic 
                  concepts like symmetric encryption and key management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
