import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Table, Eye, List, Info, BarChart3 } from "lucide-react";
import { rowTranspositionEncrypt } from "@/lib/cipher-algorithms";
import { useToast } from "@/hooks/use-toast";

export function RowTranspositionCipher() {
  const [message, setMessage] = useState("");
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");
  const [matrix, setMatrix] = useState<string[][]>([]);
  const [keyOrder, setKeyOrder] = useState<number[]>([]);
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

    if (!key.trim()) {
      toast({
        title: "Error",
        description: "Please enter a cipher key",
        variant: "destructive",
      });
      return;
    }

    setIsEncrypting(true);
    
    // Simulate processing time
    setTimeout(() => {
      try {
        const encrypted = rowTranspositionEncrypt(message, key);
        setResult(encrypted.encrypted);
        setMatrix(encrypted.matrix);
        setKeyOrder(encrypted.keyOrder);
        
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
    if (!message.trim() || !key.trim()) {
      setResult("");
      setMatrix([]);
      setKeyOrder([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      try {
        const encrypted = rowTranspositionEncrypt(message, key);
        setResult(encrypted.encrypted);
        setMatrix(encrypted.matrix);
        setKeyOrder(encrypted.keyOrder);
      } catch (error) {
        console.error("Auto-encryption failed:", error);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [message, key]);

  return (
    <Card className="border-slate-700 bg-slate-800">
      <CardHeader className="cipher-gradient-emerald text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Table className="w-4 h-4 text-white" />
            </div>
            <CardTitle className="text-xl">Row Transposition Cipher</CardTitle>
          </div>
          <Button variant="ghost" size="icon" className="text-emerald-200 hover:text-white">
            <Info className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-emerald-100 text-sm">
          A columnar transposition cipher that rearranges message characters based on a keyword
        </p>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div>
              <Label htmlFor="trans-message" className="text-slate-300 flex items-center mb-2">
                <Table className="w-4 h-4 mr-2 text-emerald-400" />
                Message to Encrypt
              </Label>
              <Textarea
                id="trans-message"
                placeholder="Enter your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="h-24 bg-slate-700 border-slate-600 text-slate-50 placeholder-slate-400 focus:ring-emerald-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <Label htmlFor="trans-key" className="text-slate-300 flex items-center mb-2">
                <Copy className="w-4 h-4 mr-2 text-emerald-400" />
                Cipher Key
              </Label>
              <Input
                id="trans-key"
                type="text"
                placeholder="Enter cipher key (e.g., SECRET)"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="bg-slate-700 border-slate-600 text-slate-50 placeholder-slate-400 focus:ring-emerald-500 focus:border-transparent"
              />
              <p className="text-xs text-slate-400 mt-1">
                Key determines column arrangement order
              </p>
            </div>

            {/* Key Analysis */}
            {key && (
              <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                <h4 className="text-sm font-medium text-slate-300 mb-2 flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2 text-amber-400" />
                  Key Analysis
                </h4>
                <div className="grid gap-2 text-center text-xs" style={{ gridTemplateColumns: `repeat(${Math.min(key.length, 6)}, 1fr)` }}>
                  {key.split('').slice(0, 6).map((char, index) => (
                    <div key={index} className="bg-slate-600 rounded p-2">
                      <div className="text-emerald-400 font-mono font-bold">{char.toUpperCase()}</div>
                      <div className="text-slate-400">{keyOrder[index] || '?'}</div>
                    </div>
                  ))}
                </div>
                {key.length > 6 && (
                  <p className="text-xs text-slate-400 mt-2 text-center">
                    Showing first 6 characters
                  </p>
                )}
              </div>
            )}

            <Button
              onClick={handleEncrypt}
              disabled={isEncrypting || !message.trim() || !key.trim()}
              className="w-full cipher-gradient-emerald hover:from-emerald-700 hover:to-emerald-800 text-white font-medium"
            >
              {isEncrypting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Encrypting...
                </>
              ) : (
                <>
                  <Table className="w-4 h-4 mr-2" />
                  Encrypt Message
                </>
              )}
            </Button>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            {/* Matrix Visualization */}
            <div>
              <Label className="text-slate-300 flex items-center mb-3">
                <Eye className="w-4 h-4 mr-2 text-amber-400" />
                Transposition Matrix
              </Label>
              <div className="bg-slate-700 rounded-lg p-4 border border-slate-600 overflow-x-auto">
                {matrix.length > 0 && key ? (
                  <table className="w-full text-center font-mono text-sm">
                    <thead>
                      <tr className="text-emerald-400">
                        {key.split('').map((char, index) => (
                          <th key={index} className="p-1 border border-slate-600 min-w-[40px]">
                            {char.toUpperCase()}({keyOrder[index]})
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="text-slate-300">
                      {matrix.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="p-1 border border-slate-600">
                              {cell || ''}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex items-center justify-center h-24 text-slate-400 text-sm">
                    Enter message and key to see the transposition matrix
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
                <li>Create matrix with key length as columns</li>
                <li>Number columns based on alphabetical key order</li>
                <li>Fill matrix row by row with message characters</li>
                <li>Read columns in numerical order to get cipher text</li>
              </ol>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
