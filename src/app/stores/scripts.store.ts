export type ScriptName = 'youtube' | 'spotify' | 'deezer' | 'soundcloud';

interface IScript {
    name: ScriptName;
    src: string;
}

export const ScriptStore: IScript[] = [
    { name: 'youtube', src: 'https://www.youtube.com/iframe_api' },
    { name: 'spotify', src: 'https://sdk.scdn.co/spotify-player.js' }
];
