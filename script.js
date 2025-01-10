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
    const absoluteUKFollowers = parseFloat(document.getElementById("absolute_uk_followers").value);

    // Normalize UK percentage
    const ukPercentageScore = Math.min(ukPercentage / ukPercentageThreshold, 1);
    // Normalize absolute UK followers
    const absoluteUKScore = Math.min(absoluteUKFollowers / absoluteUKThreshold, 1);
    // Normalize engagement rate
    const engagementScore = engagementRate / 10;
    // Logarithmic scaling for follower count
    const followerScore = Math.log10(followerCount);

    // Calculate total score
    const totalScore = (
        weights.uk_percentage * ukPercentageScore +
        weights.absolute_uk_followers * absoluteUKScore +
        weights.engagement_rate * engagementScore +
        weights.follower_count * (followerScore / 10) // Scale follower score to 0-1
    );

    // Display the result
    document.getElementById("result").innerText = `The calculated score is: ${totalScore.toFixed(2)}`;
}
