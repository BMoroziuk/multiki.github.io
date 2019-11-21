<?php
$array = explode('.', $_POST['name']);
array_pop($array);
$array[]='json';
$filename = implode('.', $array);
file_put_contents('jsons/' . $filename, $_POST['json']);
chmod('jsons/' . $filename, 0775);