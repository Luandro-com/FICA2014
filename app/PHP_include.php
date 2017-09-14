#include CSS
@charset "utf-8"
<?php
ob_start ("ob_gzhandler");
header("Content-type: text/css; charset: UTF-8");
header("Cache-Control: must-revalidate");
$offset = 172800 ;
$ExpStr = "Expires: " .
gmdate("D, d M Y H:i:s",
time() + $offset) . " GMT";
header($ExpStr);
header('Cache-Control: max-age=259200');
header('Last-Modified: '.gmdate('D, d M Y H:i:s', filemtime($fn)).' GMT');
?>
#include JS
<?php
ob_start ("ob_gzhandler");
header("Content-type: text/javascript; charset: UTF-8");
header("Cache-Control: must-revalidate");
$offset = 172800 ;
$ExpStr = "Expires: " .
gmdate("D, d M Y H:i:s",
time() + $offset) . " GMT";
header($ExpStr);
header('Cache-Control: max-age=259200');
header('Last-Modified: '.gmdate('D, d M Y H:i:s', filemtime($fn)).' GMT');
?>

