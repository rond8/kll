<?php
require_once 'includes/colleges-data.php';
$pageTitle = 'University - Colleges';
require_once 'includes/header.php';
?>

<main>
    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-content">
            <h1>Welcome to Our University</h1>
            <p>Discover your path to excellence through our distinguished colleges</p>
            <a href="#colleges" class="btn btn-primary">Explore Colleges</a>
        </div>
    </section>

    <!-- Colleges Grid -->
    <section id="colleges" class="colleges-section">
        <div class="container">
            <h2 class="section-title">Our Colleges</h2>
            <p class="section-subtitle">Choose from our six colleges offering diverse programs tailored to your career goals</p>
            
            <div class="colleges-grid">
                <?php foreach ($colleges as $key => $college): ?>
                    <div class="college-card" style="--college-color: <?= $college['color'] ?>">
                        <div class="college-icon"><?= $college['icon'] ?></div>
                        <h3><?= htmlspecialchars($college['abbrev']) ?></h3>
                        <h4><?= htmlspecialchars($college['name']) ?></h4>
                        <p><?= htmlspecialchars(substr($college['description'], 0, 120)) ?>...</p>
                        <a href="college.php?dept=<?= $key ?>" class="btn btn-outline">Learn More</a>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
        <div class="container">
            <div class="stats-grid">
                <div class="stat-item">
                    <span class="stat-number">6</span>
                    <span class="stat-label">Colleges</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">24+</span>
                    <span class="stat-label">Programs</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">15,000+</span>
                    <span class="stat-label">Students</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">500+</span>
                    <span class="stat-label">Faculty</span>
                </div>
            </div>
        </div>
    </section>
</main>

<?php require_once 'includes/footer.php'; ?>
