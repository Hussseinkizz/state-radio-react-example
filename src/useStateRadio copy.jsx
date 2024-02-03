import { useRef } from 'react';
import { StateRadio } from './state-radio.js';
import { useState, useEffect } from 'react';

export function useStateRadio() {
  const { channels } = new StateRadio();

  let previousChannelRef = useRef(null);

  function createChannel(channelName, initialState) {
    const newChannel = channels.addChannel(channelName, initialState);
    return newChannel;
  }

  function useChannel(channel) {
    let newChannelRef = useRef(channel);

    if (Object.is(channel, previousChannelRef.current)) {
      // same channel used again, don't do anything!
      newChannelRef.current = null;

      console.error(
        `It is not a good idea to use same ${channel.name} channel for multiple instances, use it once!`
      );
    } else {
      previousChannelRef.current = newChannelRef.current;
    }

    const [state, setState] = useState(newChannelRef.current.getState());

    useEffect(() => {
      let callback = () => {
        // console.log('am called!');
        newChannelRef.current.subscribe((newState) => setState(newState));
      };
      callback();
      return newChannelRef.current.unSubscribe(callback);
    }, []);

    return [state, newChannelRef.current.setState];
  }

  return {
    createChannel,
    useChannel,
  };
}
