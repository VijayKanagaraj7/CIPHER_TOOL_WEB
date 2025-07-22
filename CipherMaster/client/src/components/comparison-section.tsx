import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, Train, Table } from "lucide-react";

export function ComparisonSection() {
  return (
    <Card className="border-slate-700 bg-slate-800">
      <CardHeader className="cipher-gradient-amber text-white">
        <CardTitle className="text-xl flex items-center">
          <Scale className="w-5 h-5 mr-3" />
          Cipher Comparison & Examples
        </CardTitle>
        <p className="text-amber-100 text-sm">
          Compare techniques and explore practical examples
        </p>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Comparison Table */}
          <div>
            <h4 className="text-lg font-medium text-slate-300 mb-4">Feature Comparison</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-600">
                    <th className="text-left py-2">Feature</th>
                    <th className="text-center py-2">Rail Fence</th>
                    <th className="text-center py-2">Row Transposition</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-700">
                    <td className="py-2">Security Level</td>
                    <td className="text-center">
                      <span className="text-blue-400 font-medium">Basic</span>
                    </td>
                    <td className="text-center">
                      <span className="text-emerald-400 font-medium">Moderate</span>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="py-2">Key Type</td>
                    <td className="text-center">Number</td>
                    <td className="text-center">Word/Phrase</td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="py-2">Pattern</td>
                    <td className="text-center">Zigzag</td>
                    <td className="text-center">Columnar</td>
                  </tr>
                  <tr>
                    <td className="py-2">Complexity</td>
                    <td className="text-center">Low</td>
                    <td className="text-center">Medium</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Example Use Cases */}
          <div>
            <h4 className="text-lg font-medium text-slate-300 mb-4">Example Use Cases</h4>
            <div className="space-y-4">
              <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                <h5 className="font-medium text-blue-400 mb-2 flex items-center">
                  <Train className="w-4 h-4 mr-2" />
                  Rail Fence Cipher
                </h5>
                <p className="text-sm text-slate-300 mb-2">
                  Best for simple obfuscation and educational purposes
                </p>
                <div className="text-xs text-slate-400 font-mono bg-slate-600 rounded p-2">
                  <strong>Example:</strong> "MEET AT DAWN" → "MEATWNETAD"
                </div>
              </div>
              
              <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                <h5 className="font-medium text-emerald-400 mb-2 flex items-center">
                  <Table className="w-4 h-4 mr-2" />
                  Row Transposition
                </h5>
                <p className="text-sm text-slate-300 mb-2">
                  Better security with variable key lengths
                </p>
                <div className="text-xs text-slate-400 font-mono bg-slate-600 rounded p-2">
                  <strong>Example:</strong> "ATTACK AT DAWN" + Key: "ZEBRA" → "TACWNAKTATD"
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
