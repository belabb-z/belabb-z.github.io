export type ScriptName = 'youtube';

interface IScript {
    name: ScriptName;
    src: string;
}

export const ScriptStore: IScript[] = [
    { name: 'youtube', src: 'https://www.youtube.com/iframe_api' }
];
