// Weights and thresholds
const weights = {
    uk_percentage: 0.3,
    absolute_uk_followers: 0.3,
    engagement_rate: 0.2,
    follower_count: 0.2
};
const ukPercentageThreshold = 5;
const absoluteUKThreshold = 10000;

function calculateScore() {
    // Get input values
    const followerCount = parseFloat(document.getElementById("follower_count").value);
    const ukPercentage = parseFloat(document.getElementById("uk_percentage").value);
    const engagementRate = parseFloat(document.getElementById("engagement_rate").value);

    // Simple validation
    if (isNaN(followerCount) || isNaN(ukPercentage) || isNaN(engagementRate)) {
        alert("Please enter valid numbers in all fields.");
        return;
    }

    // Calculate absolute UK followers
    const absoluteUKFollowers = (followerCount * ukPercentage) / 100;

    // Normalize UK percentage
    const ukPercentageScore = Math.min(ukPercentage / ukPercentageThreshold, 1);
    // Normalize absolute UK followers
    const absoluteUKScore = Math.min(absoluteUKFollowers / absoluteUKThreshold, 1);
    // Weight engagement by platform size
    const weightedEngagementRate = engagementRate * Math.log10(followerCount);
    const maxWeightedEngagement = 100; // Set an upper cap for scaled values
    const engagementScore = Math.min(weightedEngagementRate / maxWeightedEngagement, 1);
    // Logarithmic scaling for follower count
    const followerScore = Math.log10(followerCount);

    // Calculate total score (0–1 range)
    const normalizedScore = (
        weights.uk_percentage * ukPercentageScore +
        weights.absolute_uk_followers * absoluteUKScore +
        weights.engagement_rate * engagementScore +
        weights.follower_count * (followerScore / 10)
    );

    // Scale to 0–10
    const finalScore = (normalizedScore * 10).toFixed(1);

    // Add explanatory text
    let ratingDescription;
    if (finalScore >= 8) {
        ratingDescription = "Highly Impressive";
    } else if (finalScore >= 5) {
        ratingDescription = "Moderate Potential";
    } else {
        ratingDescription = "Needs Improvement";
    }

    // Display the results
    document.getElementById("result").innerHTML = `
        <p><strong>Calculated Score:</strong> ${finalScore} / 10</p>
        <p><strong>Rating:</strong> ${ratingDescription}</p>
        <p><strong>Absolute UK Followers:</strong> ${Math.round(absoluteUKFollowers)}</p>
    `;
}
