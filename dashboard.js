// Dashboard page JavaScript

class Dashboard {
    constructor() {
        this.userData = this.loadUserData();
        this.todayMood = null;
        this.init();
    }

    init() {
        this.updateWelcomeMessage();
        this.bindEvents();
        this.loadProgress();
        this.checkMoodStatus();
    }

    loadUserData() {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData) : { name: 'Friend' };
    }

    updateWelcomeMessage() {
        const welcomeTitle = document.getElementById('welcome-title');
        if (welcomeTitle && this.userData.name) {
            welcomeTitle.textContent = `Welcome back, ${this.userData.name}! 🌟`;
        }
    }

    bindEvents() {
        // Mood buttons
        const moodButtons = document.querySelectorAll('.mood-button');
        moodButtons.forEach(button => {
            button.addEventListener('click', () => this.selectMood(button));
        });

        // Header buttons
        const userButton = document.getElementById('user-button');
        const settingsButton = document.getElementById('settings-button');

        if (userButton) {
            userButton.addEventListener('click', () => this.showUserMenu());
        }

        if (settingsButton) {
            settingsButton.addEventListener('click', () => this.showSettings());
        }

        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    selectMood(button) {
        // Remove active class from all mood buttons
        const moodButtons = document.querySelectorAll('.mood-button');
        moodButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.style.background = '';
        });

        // Add active class to selected button
        button.classList.add('active');
        const mood = button.dataset.mood;
        this.todayMood = mood;

        // Set button color based on mood
        switch (mood) {
            case 'happy':
                button.style.background = '#22c55e';
                break;
            case 'neutral':
                button.style.background = '#f59e0b';
                break;
            case 'sad':
                button.style.background = '#3b82f6';
                break;
        }

        // Show feedback
        this.showMoodFeedback(mood);

        // Save mood to localStorage
        this.saveMood(mood);

        // Update progress
        this.updateProgress();
    }

    showMoodFeedback(mood) {
        const feedbackDiv = document.getElementById('mood-feedback');
        if (!feedbackDiv) return;

        let message = '';
        let className = '';

        switch (mood) {
            case 'happy':
                message = "That's wonderful! Keep up the positive energy! ✨";
                className = 'feedback-happy';
                break;
            case 'neutral':
                message = "That's perfectly okay. Every day is different, and you're doing great! 💚";
                className = 'feedback-neutral';
                break;
            case 'sad':
                message = "Thank you for being honest. Remember, it's okay to have difficult days. You're not alone. 🤗";
                className = 'feedback-sad';
                break;
        }

        feedbackDiv.innerHTML = `<p class="${className}">${message}</p>`;
        feedbackDiv.style.display = 'block';

        // Add animation
        feedbackDiv.style.opacity = '0';
        feedbackDiv.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            feedbackDiv.style.transition = 'all 0.3s ease';
            feedbackDiv.style.opacity = '1';
            feedbackDiv.style.transform = 'translateY(0)';
        }, 100);
    }

    saveMood(mood) {
        const today = new Date().toDateString();
        const moodData = {
            date: today,
            mood: mood,
            timestamp: new Date().toISOString()
        };

        // Get existing mood history
        let moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
        
        // Remove existing entry for today if it exists
        moodHistory = moodHistory.filter(entry => entry.date !== today);
        
        // Add new entry
        moodHistory.push(moodData);
        
        // Save back to localStorage
        localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
    }

    checkMoodStatus() {
        const today = new Date().toDateString();
        const moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
        const todayMood = moodHistory.find(entry => entry.date === today);

        if (todayMood) {
            this.todayMood = todayMood.mood;
            const moodButton = document.querySelector(`[data-mood="${todayMood.mood}"]`);
            if (moodButton) {
                this.selectMood(moodButton);
            }
        }
    }

    loadProgress() {
        // Load progress from localStorage or use defaults
        const progressData = JSON.parse(localStorage.getItem('progressData') || '{}');
        const today = new Date().toDateString();
        
        if (!progressData[today]) {
            progressData[today] = {
                dailyTasks: 3,
                totalTasks: 5,
                weeklyProgress: 75
            };
            localStorage.setItem('progressData', JSON.stringify(progressData));
        }

        this.updateProgressDisplay(progressData[today]);
    }

    updateProgress() {
        const today = new Date().toDateString();
        const progressData = JSON.parse(localStorage.getItem('progressData') || '{}');
        
        if (!progressData[today]) {
            progressData[today] = {
                dailyTasks: 3,
                totalTasks: 5,
                weeklyProgress: 75
            };
        }

        // If mood is selected, increment daily tasks
        if (this.todayMood && progressData[today].dailyTasks < progressData[today].totalTasks) {
            progressData[today].dailyTasks++;
        }

        localStorage.setItem('progressData', JSON.stringify(progressData));
        this.updateProgressDisplay(progressData[today]);
    }

    updateProgressDisplay(data) {
        const dailyProgress = document.getElementById('daily-progress');
        const dailyProgressBar = document.getElementById('daily-progress-bar');
        const weeklyProgress = document.getElementById('weekly-progress');
        const weeklyProgressBar = document.getElementById('weekly-progress-bar');

        if (dailyProgress) {
            dailyProgress.textContent = `${data.dailyTasks}/${data.totalTasks}`;
        }

        if (dailyProgressBar) {
            const percentage = (data.dailyTasks / data.totalTasks) * 100;
            dailyProgressBar.style.width = `${percentage}%`;
        }

        if (weeklyProgress) {
            weeklyProgress.textContent = `${data.weeklyProgress}%`;
        }

        if (weeklyProgressBar) {
            weeklyProgressBar.style.width = `${data.weeklyProgress}%`;
        }
    }

    showUserMenu() {
        // Simple alert for now - could be expanded to a modal
        alert('User menu - Coming soon!');
    }

    showSettings() {
        // Simple alert for now - could be expanded to a modal
        alert('Settings - Coming soon!');
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Dashboard();
}); 