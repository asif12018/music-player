import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function YouTubeWebPlayer({ videoId, autoplay = true }: { videoId: string; autoplay?: boolean }) {
  const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>html,body,#player{margin:0;padding:0;height:100%;background:#000}</style>
  </head>
  <body>
    <div id="player"></div>
    <script>
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          width: '100%',
          height: '100%',
          videoId: '${videoId}',
          playerVars: { 'playsinline': 1, 'autoplay': ${autoplay ? 1 : 0} }
        });
      }
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    </script>
  </body>
</html>`;

  return (
    <View style={{ height: 240 }}>
      <WebView originWhitelist={["*"]} source={{ html }} allowsInlineMediaPlayback mediaPlaybackRequiresUserAction={false} />
    </View>
  );
}