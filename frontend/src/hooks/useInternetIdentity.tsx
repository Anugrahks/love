import React from 'react';

export const useInternetIdentity = () => {
    return { identity: null, login: async () => { }, logout: async () => { } };
};

export const InternetIdentityProvider = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
};
