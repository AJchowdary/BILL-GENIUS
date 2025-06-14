import Header from "@/components/layout/header";
import BottomNavigation from "@/components/layout/bottom-navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Upload, FileText, Zap } from "lucide-react";

export default function Scan() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <main className="max-w-md mx-auto pb-20 p-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-neutral-800 mb-2">Scan Receipt</h2>
          <p className="text-neutral-500">
            AI-powered receipt scanning and data extraction
          </p>
        </div>

        {/* Scan Options */}
        <div className="space-y-4 mb-6">
          <Card className="border-2 border-dashed border-primary/30 hover:border-primary transition-colors cursor-pointer">
            <CardContent className="p-8 text-center">
              <Camera className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                Take Photo
              </h3>
              <p className="text-neutral-500 text-sm">
                Capture receipt with your camera for instant AI processing
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-dashed border-neutral-200 hover:border-primary transition-colors cursor-pointer">
            <CardContent className="p-8 text-center">
              <Upload className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                Upload from Gallery
              </h3>
              <p className="text-neutral-500 text-sm">
                Select receipt image from your photo library
              </p>
            </CardContent>
          </Card>
        </div>

        {/* AI Features */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Zap className="w-5 h-5 text-accent mr-2" />
              <h3 className="text-lg font-semibold text-neutral-800">
                AI-Powered Features
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-neutral-800 text-sm">
                    Automatic Data Extraction
                  </p>
                  <p className="text-neutral-500 text-xs">
                    Extract merchant, amount, date, and items automatically
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-neutral-800 text-sm">
                    Smart Categorization
                  </p>
                  <p className="text-neutral-500 text-xs">
                    AI suggests the most appropriate expense category
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-neutral-800 text-sm">
                    Receipt Matching
                  </p>
                  <p className="text-neutral-500 text-xs">
                    Match receipts to bank transactions automatically
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Scans */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">
              Recent Scans
            </h3>
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-500">No scanned receipts yet</p>
              <p className="text-neutral-400 text-sm">
                Start scanning to see your receipt history
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  );
}
