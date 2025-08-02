// Onboarding page JavaScript

class Onboarding {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 3;
        this.formData = {
            name: '',
            age: '',
            goals: []
        };
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateButtonState();
    }

    bindEvents() {
        // Next button
        const nextButton = document.getElementById('next-button');
        if (nextButton) {
            nextButton.addEventListener('click', () => this.nextStep());
        }

        // Goal buttons
        const goalButtons = document.querySelectorAll('.goal-button');
        goalButtons.forEach(button => {
            button.addEventListener('click', () => this.toggleGoal(button));
        });

        // Form inputs
        const nameInput = document.getElementById('name');
        const ageInput = document.getElementById('age');
        
        if (nameInput) {
            nameInput.addEventListener('input', (e) => {
                this.formData.name = e.target.value;
                this.updateButtonState();
            });
        }
        
        if (ageInput) {
            ageInput.addEventListener('input', (e) => {
                this.formData.age = e.target.value;
                this.updateButtonState();
            });
        }

        // Progress dots
        const progressDots = document.querySelectorAll('.progress-dot');
        progressDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const step = parseInt(dot.dataset.step);
                if (step <= this.currentStep) {
                    this.goToStep(step);
                }
            });
        });
    }

    nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.updateStep();
        } else {
            this.completeOnboarding();
        }
    }

    goToStep(step) {
        this.currentStep = step;
        this.updateStep();
    }

    updateStep() {
        // Hide all steps
        for (let i = 1; i <= this.totalSteps; i++) {
            const stepElement = document.getElementById(`step-${i}`);
            if (stepElement) {
                stepElement.classList.remove('active');
            }
        }

        // Show current step
        const currentStepElement = document.getElementById(`step-${this.currentStep}`);
        if (currentStepElement) {
            currentStepElement.classList.add('active');
        }

        // Update progress dots
        const progressDots = document.querySelectorAll('.progress-dot');
        progressDots.forEach((dot, index) => {
            if (index + 1 <= this.currentStep) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Update button text
        const nextButton = document.getElementById('next-button');
        if (nextButton) {
            if (this.currentStep === this.totalSteps) {
                nextButton.innerHTML = 'Start Journey <i class="fas fa-arrow-right"></i>';
            } else {
                nextButton.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
            }
        }

        // Update completion name if on step 3
        if (this.currentStep === 3) {
            const completionName = document.getElementById('completion-name');
            if (completionName && this.formData.name) {
                completionName.textContent = `You're all set, ${this.formData.name}! 🌟`;
            }
        }

        this.updateButtonState();
    }

    toggleGoal(button) {
        const goal = button.dataset.goal;
        const isSelected = button.classList.contains('selected');
        
        if (isSelected) {
            button.classList.remove('selected');
            this.formData.goals = this.formData.goals.filter(g => g !== goal);
        } else {
            button.classList.add('selected');
            this.formData.goals.push(goal);
        }
        
        this.updateButtonState();
    }

    updateButtonState() {
        const nextButton = document.getElementById('next-button');
        if (!nextButton) return;

        let isValid = false;

        switch (this.currentStep) {
            case 1:
                isValid = this.formData.name.trim() !== '' && this.formData.age.trim() !== '';
                break;
            case 2:
                isValid = this.formData.goals.length > 0;
                break;
            case 3:
                isValid = true;
                break;
        }

        nextButton.disabled = !isValid;
        nextButton.classList.toggle('disabled', !isValid);
    }

    completeOnboarding() {
        // Save user data to localStorage
        localStorage.setItem('userData', JSON.stringify(this.formData));
        
        // Show success message
        this.showSuccessMessage();
        
        // Redirect to dashboard after a delay
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
    }

    showSuccessMessage() {
        const nextButton = document.getElementById('next-button');
        if (nextButton) {
            nextButton.innerHTML = '<i class="fas fa-check"></i> Success!';
            nextButton.classList.add('success');
        }
    }
}

// Initialize onboarding when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Onboarding();
}); 