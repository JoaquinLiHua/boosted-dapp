import React, { createContext, useState, useContext, useEffect } from 'react';
import Notify from 'bnc-notify';

export const Context = createContext<any>({
	notify: null,
});

export const NotifyProvider: React.FC = ({ children }) => {
	const [notify, setNotify] = useState<any>(null);
	useEffect(() => {
		const initNotify = Notify({
			dappId: '6d987d84-81c4-4224-9b30-bf5db73ee93e',
			networkId: 1,
			desktopPosition: 'bottomRight',
			darkMode: true,
		});
		setNotify(initNotify);
	}, [setNotify]);
	return (
		<Context.Provider
			value={{
				notify,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useNotifyContext = () => useContext(Context);
