#!/bin/bash

echo "Downloading SF Symbols…"
curl https://developer.apple.com/design/downloads/SF-Symbols.dmg > /tmp/sfsymbols.dmg

# Mount the DMG
echo "Extracting TTF…"
hdiutil attach -noverify -nobrowse -mountpoint /tmp/sfsymbols /tmp/sfsymbols.dmg
tar -O -xzf "/tmp/sfsymbols/SF Symbols.pkg" "SFSymbols.pkg/Payload" | tar -O -xz "./Applications/SF Symbols.app/Contents/Resources/SFSymbolsFallback.ttf" > images/SFSymbolsFallback.ttf

# Clean up.
echo "Cleaning up…"
hdiutil detach /tmp/sfsymbols
rm /tmp/sfsymbols.dmg
