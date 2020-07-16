set -x

rm -rf .babel-cache dist

attempts=20

for i in `seq $attempts`; do
  rm -rf test-$i
done

for i in `seq $attempts`; do
  npm run build
  cp -r dist test-$i

  rm -rf test-$i/*.map
  rm -rf test-$i/*.json

  prev=`expr $i - 1`
  if [ "$prev" != "0" ]; then
    if git diff --quiet --no-index test-$prev test-$i; then
        echo "NO difference between $prev and $i ✅"
    else
        echo "FOUND difference between $prev and $i ❌"
        git diff --no-index test-$prev test-$i
        exit 1
    fi
  fi
done
