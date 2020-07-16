```bash
git clean -fd before after

npm run build
cp -r dist before

npm run build
cp -r dist after

# Observe the hashes of each chunk
ls before after

git diff --no-index before after
```