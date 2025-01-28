// Define thresholds and maximum values for normalization
const ukPercentageThreshold = 5; // 5% UK followers
const absoluteUKThreshold = 10000; // 10,000 UK followers
const maxWeightedEngagement = 50; // Arbitrary max for weighted engagement
const maxWeightedGrowth = 50; // Arbitrary max for weighted growth

// Define weights for each metric
const weights = {
    uk_percentage: 0.25,
    absolute_uk_followers: 0.25,
    engagement_rate: 0.2,
    follower_count: 0.2,
    growth_rate: 0.1 // Adjust this weight as needed
};

function calculateScore() {
    // Get input values
    const influencerName = document.getElementById("influencer_name").value;
    const url = document.getElementById("url").value;
    const description = document.getElementById("description").value;
    const idea = document.getElementById("idea").value;
    const followerCount = parseFloat(document.getElementById("follower_count").value);
    const ukPercentage = parseFloat(document.getElementById("uk_percentage").value);
    const engagementRate = parseFloat(document.getElementById("engagement_rate").value);
    const growthRate = parseFloat(document.getElementById("growth_rate").value);

    // Simple validation
    if (isNaN(followerCount) || isNaN(ukPercentage) || isNaN(engagementRate) || isNaN(growthRate)) {
        alert("Please enter valid numbers in all required fields.");
        return;
    }

    // Calculate absolute UK followers
    const absoluteUKFollowers = (followerCount * ukPercentage) / 100;

    // Normalize and calculate scores
    const ukPercentageScore = Math.min(ukPercentage / ukPercentageThreshold, 1);
    const absoluteUKScore = Math.min(absoluteUKFollowers / absoluteUKThreshold, 1);
    const weightedEngagementRate = engagementRate * Math.log10(followerCount);
    const engagementScore = Math.min(weightedEngagementRate / maxWeightedEngagement, 1);
    const followerScore = Math.log10(followerCount) / 10;
    const weightedGrowthRate = growthRate * Math.log10(followerCount);
    const growthScore = Math.min(weightedGrowthRate / maxWeightedGrowth, 1);

    const normalizedScore = (
        weights.uk_percentage * ukPercentageScore +
        weights.absolute_uk_followers * absoluteUKScore +
        weights.engagement_rate * engagementScore +
        weights.follower_count * followerScore +
        weights.growth_rate * growthScore
    );

    const finalScore = (normalizedScore * 10).toFixed(1);

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
        <p><strong>Influencer Name:</strong> ${influencerName}</p>
        <p><strong>URL:</strong> <a href="${url}" target="_blank">${url}</a></p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Idea:</strong> ${idea}</p>
        <p><strong>Calculated Score:</strong> ${finalScore} / 10</p>
        <p><strong>Rating:</strong> ${ratingDescription}</p>
        <p><strong>Absolute UK Followers:</strong> ${Math.round(absoluteUKFollowers)}</p>
    `;
}
