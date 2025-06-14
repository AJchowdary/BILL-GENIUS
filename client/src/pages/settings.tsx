import Header from "@/components/layout/header";
import BottomNavigation from "@/components/layout/bottom-navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Bell, 
  CreditCard, 
  Shield, 
  Download, 
  HelpCircle, 
  ChevronRight,
  LogOut
} from "lucide-react";

export default function Settings() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <main className="max-w-md mx-auto pb-20 p-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-neutral-800 mb-2">Settings</h2>
          <p className="text-neutral-500">
            Manage your account and app preferences
          </p>
        </div>

        {/* Profile Section */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-xl">
                JS
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-neutral-800">John Smith</h3>
                <p className="text-neutral-500 text-sm">john.smith@example.com</p>
                <p className="text-neutral-400 text-xs mt-1">Free Plan</p>
              </div>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Settings Sections */}
        <div className="space-y-4">
          {/* Account */}
          <Card>
            <CardContent className="p-0">
              <div className="p-4 border-b border-neutral-100">
                <h3 className="font-semibold text-neutral-800">Account</h3>
              </div>
              <div className="space-y-0">
                <button className="w-full flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-neutral-500" />
                    <span className="text-neutral-800">Profile Settings</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-neutral-400" />
                </button>
                <button className="w-full flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-5 h-5 text-neutral-500" />
                    <span className="text-neutral-800">Payment Methods</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-neutral-400" />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardContent className="p-0">
              <div className="p-4 border-b border-neutral-100">
                <h3 className="font-semibold text-neutral-800">Preferences</h3>
              </div>
              <div className="space-y-0">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-neutral-500" />
                    <span className="text-neutral-800">Push Notifications</span>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-3">
                    <Download className="w-5 h-5 text-neutral-500" />
                    <span className="text-neutral-800">Auto-sync Receipts</span>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardContent className="p-0">
              <div className="p-4 border-b border-neutral-100">
                <h3 className="font-semibold text-neutral-800">Security</h3>
              </div>
              <div className="space-y-0">
                <button className="w-full flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-neutral-500" />
                    <span className="text-neutral-800">Privacy & Security</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-neutral-400" />
                </button>
                <button className="w-full flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Download className="w-5 h-5 text-neutral-500" />
                    <span className="text-neutral-800">Export Data</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-neutral-400" />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <Card>
            <CardContent className="p-0">
              <div className="p-4 border-b border-neutral-100">
                <h3 className="font-semibold text-neutral-800">Support</h3>
              </div>
              <div className="space-y-0">
                <button className="w-full flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="w-5 h-5 text-neutral-500" />
                    <span className="text-neutral-800">Help & FAQ</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-neutral-400" />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Logout */}
          <Card>
            <CardContent className="p-4">
              <button className="w-full flex items-center justify-center space-x-3 text-red-500 hover:text-red-600 transition-colors">
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </CardContent>
          </Card>
        </div>

        {/* App Info */}
        <div className="text-center mt-8 pb-4">
          <p className="text-neutral-400 text-sm">Bill Genius v1.0.0</p>
          <p className="text-neutral-400 text-xs mt-1">© 2024 Bill Genius. All rights reserved.</p>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
