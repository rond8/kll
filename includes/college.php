<?php
require_once 'includes/colleges-data.php';

// Get department from URL
$dept = $_GET['dept'] ?? '';

// Validate department exists
if (!isset($colleges[$dept])) {
    header('Location: index.php');
    exit;
}

$college = $colleges[$dept];
$pageTitle = $college['name'] . ' | University';
require_once 'includes/header.php';
?>

<main>
    <!-- College Hero -->
    <section class="college-hero" style="--college-color: <?= $college['color'] ?>">
        <div class="college-hero-content">
            <span class="college-icon-large"><?= $college['icon'] ?></span>
            <h1><?= htmlspecialchars($college['name']) ?></h1>
            <p class="college-abbrev"><?= htmlspecialchars($college['abbrev']) ?></p>
        </div>
    </section>

    <!-- College Content -->
    <div class="college-content">
        <div class="container">
            <!-- About Section -->
            <section class="content-section">
                <h2>About the College</h2>
                <p class="lead-text"><?= htmlspecialchars($college['description']) ?></p>
                
                <div class="dean-info">
                    <h4>Office of the Dean</h4>
                    <p><strong>Dean:</strong> <?= htmlspecialchars($college['dean']) ?></p>
                    <p><strong>Email:</strong> <a href="mailto:<?= $college['contact'] ?>"><?= htmlspecialchars($college['contact']) ?></a></p>
                </div>
            </section>

            <!-- Programs Section -->
            <section class="content-section">
                <h2>Academic Programs</h2>
                <div class="programs-grid">
                    <?php foreach ($college['programs'] as $program): ?>
                        <div class="program-card" style="--college-color: <?= $college['color'] ?>">
                            <div class="program-icon">📖</div>
                            <h4><?= htmlspecialchars($program) ?></h4>
                            <a href="#" class="program-link">View Curriculum →</a>
                        </div>
                    <?php endforeach; ?>
                </div>
            </section>

            <!-- Facilities Section -->
            <section class="content-section">
                <h2>Facilities</h2>
                <div class="facilities-list">
                    <?php foreach ($college['facilities'] as $facility): ?>
                        <div class="facility-item">
                            <span class="facility-check">✓</span>
                            <?= htmlspecialchars($facility) ?>
                        </div>
                    <?php endforeach; ?>
                </div>
            </section>

            <!-- CTA Section -->
            <section class="cta-section" style="--college-color: <?= $college['color'] ?>">
                <h3>Ready to Join <?= htmlspecialchars($college['abbrev']) ?>?</h3>
                <p>Take the first step towards your future career</p>
                <div class="cta-buttons">
                    <a href="#" class="btn btn-white">Apply Now</a>
                    <a href="#" class="btn btn-outline-white">Request Information</a>
                </div>
            </section>
        </div>
    </div>

    <!-- Other Colleges -->
    <section class="other-colleges">
        <div class="container">
            <h3>Explore Other Colleges</h3>
            <div class="other-colleges-grid">
                <?php foreach ($colleges as $key => $other): ?>
                    <?php if ($key !== $dept): ?>
                        <a href="college.php?dept=<?= $key ?>" class="other-college-link" style="--college-color: <?= $other['color'] ?>">
                            <span><?= $other['icon'] ?></span>
                            <?= htmlspecialchars($other['abbrev']) ?>
                        </a>
                    <?php endif; ?>
                <?php endforeach; ?>
            </div>
        </div>
    </section>
</main>

<?php require_once 'includes/footer.php'; ?>
