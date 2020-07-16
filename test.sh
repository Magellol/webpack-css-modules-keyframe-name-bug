set -x

trash .babel-cache dist

attempts=20

for i in `seq $attempts`; do
  trash test-$i
done

for i in `seq $attempts`; do
  npm run build
  cp -r dist test-$i

  trash test-$i/**/*.map
  trash test-$i/**/*.json

  prev=`expr $i - 1`
  if [ "$prev" != "0" ]; then
    if git diff --quiet --no-index test-$prev test-$i; then
        echo "NO difference between $prev and $i ✅"
    else
        echo "FOUND difference between $prev and $i ❌"
        exit 1
    fi
  fi

  sleep 2
done
