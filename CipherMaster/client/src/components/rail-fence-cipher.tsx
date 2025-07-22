import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Train, Eye, List, Info } from "lucide-react";
import { railFenceEncrypt } from "@/lib/cipher-algorithms";
import { useToast } from "@/hooks/use-toast";

export function RailFenceCipher() {
  const [message, setMessage] = useState("");
  const [rails, setRails] = useState(3);
  const [result, setResult] = useState("");
  const [visualization, setVisualization] = useState<string[][]>([]);
  const [isEncrypting, setIsEncrypting] = useState(false);
  const { toast } = useToast();

  const handleEncrypt = async () => {
    if (!message.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message to encrypt",
        variant: "destructive",
      });
      return;
    }

    setIsEncrypting(true);
    
    // Simulate processing time
    setTimeout(() => {
      try {
        const encrypted = railFenceEncrypt(message, rails);
        setResult(encrypted.encrypted);
        setVisualization(encrypted.visualization);
        
        toast({
          title: "Success",
          description: "Message encrypted successfully!",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Encryption failed",
          variant: "destructive",
        });
      } finally {
        setIsEncrypting(false);
      }
    }, 1000);
  };

  const handleCopy = async () => {
    if (!result) return;
    
    try {
      await navigator.clipboard.writeText(result);
      toast({
        title: "Copied!",
        description: "Encrypted message copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  // Auto-encrypt when inputs change (with debounce)
  useEffect(() => {
    if (!message.trim()) {
      setResult("");
      setVisualization([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      try {
        const encrypted = railFenceEncrypt(message, rails);
        setResult(encrypted.encrypted);
        setVisualization(encrypted.visualization);
      } catch (error) {
        console.error("Auto-encryption failed:", error);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [message, rails]);

  return (
    <Card className="border-slate-700 bg-slate-800">
      <CardHeader className="cipher-gradient-blue text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Train className="w-4 h-4 text-white" />
            </div>
            <CardTitle className="text-xl">Rail Fence Cipher</CardTitle>
          </div>
          <Button variant="ghost" size="icon" className="text-blue-200 hover:text-white">
            <Info className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-blue-100 text-sm">
          A transposition cipher that writes the message in a zigzag pattern across multiple rails
        </p>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div>
              <Label htmlFor="rail-message" className="text-slate-300 flex items-center mb-2">
                <Train className="w-4 h-4 mr-2 text-blue-400" />
                Message to Encrypt
              </Label>
              <Textarea
                id="rail-message"
                placeholder="Enter your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="h-24 bg-slate-700 border-slate-600 text-slate-50 placeholder-slate-400 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <Label className="text-slate-300 flex items-center mb-2">
                <List className="w-4 h-4 mr-2 text-blue-400" />
                Number of Rails
              </Label>
              <div className="flex items-center space-x-4">
                <Slider
                  value={[rails]}
                  onValueChange={(value) => setRails(value[0])}
                  min={2}
                  max={10}
                  step={1}
                  className="flex-1"
                />
                <span className="text-lg font-semibold text-blue-400 w-8 text-center">
                  {rails}
                </span>
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>2</span>
                <span>10</span>
              </div>
            </div>

            <Button
              onClick={handleEncrypt}
              disabled={isEncrypting || !message.trim()}
              className="w-full cipher-gradient-blue hover:from-blue-700 hover:to-blue-800 text-white font-medium"
            >
              {isEncrypting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Encrypting...
                </>
              ) : (
                <>
                  <Train className="w-4 h-4 mr-2" />
                  Encrypt Message
                </>
              )}
            </Button>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            {/* Visual Representation */}
            <div>
              <Label className="text-slate-300 flex items-center mb-3">
                <Eye className="w-4 h-4 mr-2 text-emerald-400" />
                Cipher Visualization
              </Label>
              <div className="bg-slate-700 rounded-lg p-4 min-h-[120px] border border-slate-600">
                {visualization.length > 0 ? (
                  <div className="font-mono text-sm text-slate-300 space-y-2">
                    {visualization.map((rail, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className={`${index === 0 ? 'text-blue-400' : index === 1 ? 'text-emerald-400' : 'text-amber-400'}`}>
                          Rail {index + 1}:
                        </span>
                        <span className="font-mono tracking-wider">
                          {rail.join(" ")}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                    Enter a message to see the rail pattern
                  </div>
                )}
              </div>
            </div>

            {/* Result Output */}
            <div>
              <Label className="text-slate-300 flex items-center mb-2">
                <Copy className="w-4 h-4 mr-2 text-emerald-400" />
                Encrypted Result
              </Label>
              <div className="relative">
                <input
                  type="text"
                  value={result}
                  readOnly
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-50 font-mono text-lg focus:outline-none pr-12"
                  placeholder="Encrypted message will appear here"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopy}
                  disabled={!result}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-emerald-400"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Algorithm Steps */}
            <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
              <h4 className="text-sm font-medium text-slate-300 mb-2 flex items-center">
                <List className="w-4 h-4 mr-2 text-amber-400" />
                Algorithm Steps
              </h4>
              <ol className="text-xs text-slate-400 space-y-1 list-decimal list-inside">
                <li>Write message in zigzag pattern across {rails} rails</li>
                <li>Read characters from each rail left to right</li>
                <li>Concatenate all rails to form cipher text</li>
              </ol>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
