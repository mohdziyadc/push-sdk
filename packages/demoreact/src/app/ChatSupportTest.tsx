import React, { useContext } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { Chat, ITheme } from '@pushprotocol/uiweb';
import { lightTheme } from '@pushprotocol/uiweb';
import { EnvContext, Web3Context } from './context';

export type ChatProps = {
  provider: Web3Provider;
  supportAddress: string;
  greetingMsg?: string;
  modalTitle?: string;
  primaryColor?: string;
  apiKey?: string;
  env?: string;
};

export const ChatSupportTest = () => {
  const { account } = useContext<any>(Web3Context);
  const { env } = useContext<any>(EnvContext);
  const theme: ITheme = {
    bgColorPrimary: 'gray',
    bgColorSecondary: 'purple',
    textColorPrimary: 'white',
    textColorSecondary: 'green',
    btnColorPrimary: 'red',
    btnColorSecondary: 'purple',
    border: '1px solid black',
    borderRadius: '40px',
    moduleColor: 'pink',
  };

  return (
    <Chat
      account={account}
      supportAddress="0x0DaE5EC13C1236816B2916527059F9845ba526Be"
      apiKey="tAWEnggQ9Z.UaDBNjrvlJZx3giBTIQDcT8bKQo1O1518uF1Tea7rPwfzXv2ouV5rX9ViwgJUrXm"
      env={env}
      greetingMsg="How can i help you?"
      theme={lightTheme}
    />
  );
};
