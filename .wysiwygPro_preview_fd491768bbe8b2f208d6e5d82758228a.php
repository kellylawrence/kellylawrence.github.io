<?php
if ($_GET['randomId'] != "9UeBaeZYPe_wLNKb_ISE5lTuwdJqOMip2A1OIyCJK8kZBufH6__8UXCeZU4rsv1A") {
    echo "Access Denied";
    exit();
}

// display the HTML code:
echo stripslashes($_POST['wproPreviewHTML']);

?>  
