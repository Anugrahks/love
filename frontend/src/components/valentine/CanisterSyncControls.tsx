import { useState } from 'react';
import { LogIn, LogOut, Save, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useCanisterUserSettings } from '@/hooks/useCanisterUserSettings';
import { useQueryClient } from '@tanstack/react-query';

export default function CanisterSyncControls() {
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const { saveSettings, loadSettings, isSaving, isLoading } = useCanisterUserSettings();
  const [message, setMessage] = useState('');
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const isProcessing = loginStatus === 'logging-in' || isSaving || isLoading;

  const handleLogin = async () => {
    try {
      await login();
      setMessage('Logged in successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Login failed. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    setMessage('Logged out successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleSave = async () => {
    try {
      await saveSettings();
      setMessage('Saved to cloud successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to save. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleLoad = async () => {
    try {
      await loadSettings();
      setMessage('Loaded from cloud successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to load. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {isAuthenticated
          ? 'Save your customizations to the cloud and access them from any device.'
          : 'Login with Internet Identity to save your customizations to the cloud.'}
      </p>

      {!isAuthenticated ? (
        <Button
          onClick={handleLogin}
          disabled={isProcessing}
          className="w-full"
        >
          <LogIn className="w-4 h-4 mr-2" />
          {loginStatus === 'logging-in' ? 'Logging in...' : 'Login'}
        </Button>
      ) : (
        <div className="space-y-2">
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              disabled={isProcessing}
              className="flex-1"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
            <Button
              onClick={handleLoad}
              disabled={isProcessing}
              variant="outline"
              className="flex-1"
            >
              <Download className="w-4 h-4 mr-2" />
              {isLoading ? 'Loading...' : 'Load'}
            </Button>
          </div>
          
          <Button
            onClick={handleLogout}
            disabled={isProcessing}
            variant="ghost"
            className="w-full"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      )}

      {message && (
        <p className="text-sm text-center text-primary fade-in">
          {message}
        </p>
      )}
    </div>
  );
}
