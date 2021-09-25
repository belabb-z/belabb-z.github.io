import { Injectable } from "@angular/core";
import { ScriptName, ScriptStore } from "../stores/scripts.store";

@Injectable({
  providedIn: 'root'
})
export class ScriptLoaderService {

  private scripts: any = {};

  constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }

  load(...scripts: ScriptName[]) {
    var promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: ScriptName): Promise<void> {
    return new Promise((resolve, reject) => {
      //resolve if already loaded
      if (this.scripts[name].loaded) {
        resolve();
      }
      else {
        (window as any).onYouTubeIframeAPIReady = () => {
          resolve();
        };

        //load script
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        script.onload = () => {
          this.scripts[name].loaded = true;
        };
        script.onerror = (error: any) => resolve();
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    });
  }

}
