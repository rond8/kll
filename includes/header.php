<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $pageTitle ?? 'University Colleges' ?></title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <nav class="navbar">
        <div class="nav-container">
            <a href="index.php" class="nav-logo">🎓 University</a>
            <ul class="nav-menu">
                <li><a href="index.php">Home</a></li>
                <li class="dropdown">
                    <a href="#">Colleges ▼</a>
                    <ul class="dropdown-menu">
                        <?php foreach ($colleges as $key => $college): ?>
                            <li><a href="college.php?dept=<?= $key ?>"><?= $college['abbrev'] ?></a></li>
                        <?php endforeach; ?>
                    </ul>
                </li>

            </ul>
        </div>
    </nav>
