<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Mult Annotation</title>
    <link rel="icon" href="images/bugs.png">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script
            src="https://code.jquery.com/jquery-3.4.1.js"
            integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU="
            crossorigin="anonymous"></script>
    <link rel="stylesheet" type="text/css" href="style/index.css">
    <script src="scripts/index.js"></script>
</head>
<body>
<div id="inform">0</div>
<div id="side">
    <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="ocl">
        <label class="form-check-label" for="ocl">
            Occluded (1)
        </label>
    </div>
    <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="trans">
        <label class="form-check-label" for="trans">
            Truncated (2)
        </label>
    </div>
</div>
<div id="header" class="header p-1 row-12">

<div class="col-8 m-auto">
    <form action="/" method="POST">
        <div class="input-group col-6">
            <div class="custom-file">
                <input type="file" class="custom-file-input" id="image">
                <label class="custom-file-label" for="inputGroupFile02"
                       aria-describedby="inputGroupFileAddon02">Choose imaage</label>
            </div>
            <div class="input-group-append">
                <span class="btn btn-success  upload " id="inputGroupFileAddon02">Upload</span>
            </div>
        </div>
    </form>
    <label for="finalall" class="success">Saved!</label>
        <input type="submit" id="finalall" class="btn btn-success submit" onclick="finalAll()" value="Save">

</div>


</div>


<div id="main" class="main">
    <svg id="mainFrame"></svg>
</div>
<div id="toolbar" class="toolbar row-12">
    <div class="col-8 m-auto p-1 toolbarrow">
        <img src="images/kermit.png"  alt="Kermit" id="kermit" class="picto kermit">
        <img src="images/animal.png" alt="Animal" id="animal" class="picto animal">
        <img src="images/piggy.png" alt="Piggy" id="piggy" class="picto piggy">
        <img src="images/fozzie.png" alt="Fozzie" id="fozzie" class="picto fozzie">
        <img src="images/gonzo.png" alt="Gonzo" id="gonzo" class="picto gonzo">
        <img src="images/summer.png" alt="Summer" id="summer" class="picto summer">
    </div>
</div>
</body>
</html>