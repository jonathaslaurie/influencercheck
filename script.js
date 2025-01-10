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
    const absoluteUKScore = Math.min(absoluteUKFollowers / absoluteUKThr
