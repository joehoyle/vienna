#!/bin/bash

echo "Downloading SF Symbols…"
curl https://developer.apple.com/design/downloads/SF-Symbols.dmg > /tmp/sfsymbols.dmg

# Mount the DMG
echo "Extracting TTF…"
hdiutil attach -noverify -nobrowse -mountpoint /tmp/sfsymbols /tmp/sfsymbols.dmg
pkgutil --expand "/tmp/sfsymbols/SF Symbols.pkg" /tmp/sfsymbols-extracted
tar -O -f "/tmp/sfsymbols-extracted/SFSymbols.pkg/Payload" -xz "./Applications/SF Symbols.app/Contents/Resources/SFSymbolsFallback.ttf" > images/SFSymbolsFallback.ttf

# Clean up.
echo "Cleaning up…"
rm -r /tmp/sfsymbols-extracted
hdiutil detach /tmp/sfsymbols
rm /tmp/sfsymbols.dmg
