{ nixpkgs ? import <nixpkgs> { } }:
let
  inherit (nixpkgs) mkYarnPackage;
  inherit (nixpkgs.nix-gitignore) gitignoreSource;
in
mkYarnPackage {
  src = gitignoreSource [] ./.;
  buildPhase = ''
    yarn build-lib
  '';

  # don't do anything
  installPhase = ''
    # do nothing (load bearing comment)
  '';

  distPhase = ''
    mkdir -p $out/dist
    cp -R deps/*/dist/* $out/dist
  '';
  dontStrip = true;
}
